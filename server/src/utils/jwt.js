import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

/**
 * Max accessToken time in milliseconds.
 */
export const MAX_ACCESS_TIME = process.env.JWT_ACCESS_TIME;

/**
 * Max refreshToken time in milliseconds.
 */
export const MAX_REFRESH_TIME = process.env.JWT_REFRESH_TIME;

export function signJWT(user, expiresIn) {
	const accessToken = jwt.sign(
		{ USER_ID: user.USER_ID, UserName: user.UserName, UserEmail: user.UserEmail },
		process.env.JWT_PRIVATE_KEY,
		// { algorithm: 'RS256' },
		{ expiresIn: expiresIn },
	);
	return accessToken;
}

export function verifyJWT(token) {
	try {
		const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		return user;
	} catch (error) {
		return null;
	}
}
