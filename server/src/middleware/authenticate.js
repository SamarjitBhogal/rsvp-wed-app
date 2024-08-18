import { config } from 'dotenv';
import { User } from '../models/user.js';
import { signJWT, verifyJWT } from '../utils/jwt.js';

config();

/**
 * A middleware that checks user making the request is authorized to that is,
 * the user is authenticated.
 */
export async function authToken(req, res, next) {
	const { accessToken, refreshToken } = req.cookies;
	// const authHeader = req.headers['authorization'];
	// const accessToken = authHeader && authHeader.split(' ')[1];
	if (accessToken == null) {
		return res.status(401).send({ message: 'Inappropriate request. Bad header format or unauthenticated.' });
	}

	const user = verifyJWT(accessToken);

	if (!user) {
		// generate new access token with refresh token. first check if refresh is valid if not log out and tell user to log in.
		// if valid generate new access token and overwrite cookie
		return refreshAToken(req, res, next, refreshToken);

		//return res.status(403).send({ message: 'Token invalid. User request is unauthorized. User must login.' });
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
	console.log('made it here wooohooo');
	const accessToken = signJWT(user, '5s');

	res.cookie('accessToken', accessToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 500 * 60 * 60 * 1000,
	});

	req.user = user;
	return next();
}
