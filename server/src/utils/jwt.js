import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/**
 * Max accessToken time in milliseconds.
 */
export const MAX_ACCESS_TIME = process.env.JWT_ACCESS_TIME;

export function signJWT(user) {
	const accessToken = jwt.sign(
		{ USER_ID: user.USER_ID, UserName: user.UserName, UserEmail: user.UserEmail },
		process.env.JWT_SECRET,
		{ expiresIn: MAX_ACCESS_TIME },
	);
	return accessToken;
}

export function verifyJWT(token) {
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		return user;
	} catch (error) {
		return null;
	}
}
