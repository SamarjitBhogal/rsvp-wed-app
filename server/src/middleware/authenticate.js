import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models/user.js';
import { verifyJWT } from '../utils/jwt.js';

config();

/**
 * A middleware that checks user making the request is authorized to that is,
 * the user is authenticated.
 */
export async function authToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null)
		return res.status(401).send({ message: 'Inappropriate request. Bad header format or unauthenticated.' });

	const user = verifyJWT(token);

	if (!user) {
		return res.status(403).send({ message: 'Token invalid. User request is unauthorized. User must login.' });
	}

	if (!(await User.doesUserExist(user.USER_ID))) {
		return res.status(404).send({ message: 'This user does not exist.' });
	}

	req.user = user;
	return next();
}
