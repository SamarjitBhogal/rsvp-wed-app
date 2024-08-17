import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export function signJWT(user) {
	const accessToken = jwt.sign(
		user,
		process.env.JWT_SECRET_KEY,
		// { expiresIn: process.env.JWT_EXPIRE_TIME }
	);
	return accessToken;
}

export function verifyJWT(token) {
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
		return user;
	} catch (error) {
		return null;
	}
}
