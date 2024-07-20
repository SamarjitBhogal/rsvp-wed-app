import { config } from "dotenv";
import mysql from "mysql2";

const DB_NAME = process.env.DB_NAME;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_LH_PASSWORD;

config();

mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: DB_NAME
}).promise();