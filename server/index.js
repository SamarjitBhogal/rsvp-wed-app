import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import createRouter from 'express-file-routing';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

config();
const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const SERVER_SRC = path.join(__dirname, 'src');

const PORT = process.env.PORT;

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

await createRouter(app, { directory: path.join(SERVER_SRC, 'routes') }); // as wrapper function

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
});
