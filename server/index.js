import express from "express"
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import createRouter from "express-file-routing";
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const PORT = process.env.PORT;
const SERVER_SRC = path.join(__dirname, 'src');
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));

await createRouter(app, { directory: path.join(SERVER_SRC, "routes") }); // as wrapper function

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
});