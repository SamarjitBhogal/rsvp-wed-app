import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/**
 * Max accessToken time in milliseconds.
 */
export const MAX_ACCESS_TIME = process.env.JWT_ACCESS_TIME;

export function signJWT(data) {
	const accessToken = jwt.sign(
		data,
		process.env.JWT_SECRET,
		{ expiresIn: MAX_ACCESS_TIME },
	);
	return accessToken;
}

export function verifyJWT(token) {
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		return data;
	} catch (error) {
		return null;
	}
}
