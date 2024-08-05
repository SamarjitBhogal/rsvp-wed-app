import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export async function signJWT(user) {
	const accessToken = jwt.sign(
		{ USER_ID: user.USER_ID, UserName: user.UserName, UserEmail: user.UserEmail },
		process.env.JWT_SECRET_KEY,
		// { expiresIn: process.env.JWT_EXPIRE_TIME }
	);
	return accessToken;
}
