import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

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
