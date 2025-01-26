import { config } from 'dotenv';
import mysql from 'mysql2';

config();

// Local host:

// const DB_NAME = process.env.DB_NAME;
// const MYSQL_HOST = process.env.MYSQL_HOST;
// const MYSQL_USER = process.env.MYSQL_USER;
// const MYSQL_PASS = process.env.MYSQL_LH_PASSWORD;

// export const db = mysql
//   .createPool({
//     host: MYSQL_HOST,
//     user: MYSQL_USER,
//     password: MYSQL_PASS,
//     database: DB_NAME,
//   })
//   .promise();

export const db = mysql
	.createPool({
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: process.env.RDS_PORT,
		database: process.env.RDS_DB_NAME,
	})
	.promise();

// Function to test the connection
async function testConnection() {
	try {
		// Simple query to test the connection
		const [rows] = await db.execute('SELECT 1 AS result');
		console.log('Connection successful:', rows);
	} catch (err) {
		console.error('Connection failed:', err.message);
	}
}

// Run the test
testConnection();
