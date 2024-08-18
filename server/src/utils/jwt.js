import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/**
 * Max accessToken time in milliseconds.
 * TODO: store as local variable in client, each request that needs auth from client will send this in the header
 */
export const MAX_ACCESS_TIME = process.env.JWT_ACCESS_TIME;

/**
 * Max refreshToken time in milliseconds.
 */
export const MAX_REFRESH_TIME = process.env.JWT_REFRESH_TIME;

// TODO make key pair work
//const PUBLIC_KEY = fs.readFileSync(__dirname + '/public.pem', 'utf8');
//const PRIVATE_KEY = fs.readFileSync(__dirname + '/private.pem', 'utf8');

export function signJWT(user, expiresIn) {
	const accessToken = jwt.sign(
		{ USER_ID: user.USER_ID, UserName: user.UserName, UserEmail: user.UserEmail },
		process.env.JWT_SECRET,
		// { algorithm: 'RS256' },
		{ expiresIn: expiresIn },
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
