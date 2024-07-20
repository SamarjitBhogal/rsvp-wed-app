import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import createRouter, { router } from "express-file-routing"

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const PORT = 3000;
const SERVER_SRC = path.join(__dirname, 'src');
const app = express();

await createRouter(app, { directory: path.join(SERVER_SRC, "routes") }); // as wrapper function

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
});