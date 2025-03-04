import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createRouter from 'express-file-routing';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import StatusCodes from 'http-status-codes';

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const SERVER_SRC = path.join(__dirname, 'src');

config({ path: path.resolve(__dirname, '../.env') });  // Explicitly specify the path to the .env file

const PORT = process.env.PORT;

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}, credentials: true,
	methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

await createRouter(app, { directory: path.join(SERVER_SRC, 'routes') }); // as wrapper function

// Serve frontend only in production
if (process.env.NODE_MODE === "production") {
	app.use(express.static(path.join(__dirname, "../client/dist")));

	app.all("*", (req, res, next) => {
		const knownRoutes = app._router.stack
			.filter((r) => r.route)
			.map((r) => r.route.path);

		if (knownRoutes.includes(req.path)) {
			return next(); // Allow backend routes to handle the request
		}

		if (req.method !== "GET") {
			return res.status(StatusCodes.NOT_FOUND).send({ error: "Route not found" }); // Prevent non-GET requests from serving index.html
		}

		res.sendFile(path.join(__dirname, "../client/dist/index.html"));
	});
}

app.use((req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).send({
		error: 'Not Found',
	});
});

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
});
