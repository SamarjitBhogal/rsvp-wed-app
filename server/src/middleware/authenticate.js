import { config } from 'dotenv';
import { User } from '../models/user.js';
import { signJWT, verifyJWT, MAX_ACCESS_TIME } from '../utils/jwt.js';

config();

/**
 * A middleware that checks user making the request is authorized to that is,
 * the user is authenticated.
 * 
 * TODO: rename to authGuard
 */
export async function authToken(req, res, next) {
	const { accessToken, refreshToken } = req.cookies;
	const user = verifyJWT(accessToken);

	if (!user) {
		return await refreshAToken(req, res, next, refreshToken);
	}

	if (!(await User.doesUserExist(user.USER_ID))) {
		return res.status(404).send({ message: 'This user does not exist.' });
	}

	req.user = user;
	return next();
}

async function refreshAToken(req, res, next, refreshToken) {
	const user = verifyJWT(refreshToken);

	if (!user) {
		return res.status(403).send({ message: 'User request is unauthorized. User must login.' });
	}

	if (!(await User.doesUserExist(user.USER_ID))) {
		return res.status(404).send({ message: 'This user does not exist.' });
	}
	
	const accessToken = signJWT(user, MAX_ACCESS_TIME / 1000);

	res.cookie('accessToken', accessToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		maxAge: MAX_ACCESS_TIME,
	});

	req.user = user;
	return next();
}
