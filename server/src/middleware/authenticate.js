import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models/user.js';

config();

/**
 * A middleware that checks user making the request is authorized to that is,
 * the user is authenticated.
 */
export function authToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null)
		return res.status(401).send({ message: 'Inappropriate request. Bad header format or unauthenticated.' });

	jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
		if (err) {
			console.log(err);
			return res.status(403).send({ message: 'Token invalid. User request is unauthorized. User must login.' });
		}

		// Check if user exists.
		if (!(await User.doesUserExist(user.USER_ID)))
			return res.status(404).send({ message: 'This user does not exist.' });

		req.user = user;
		return next();
	});
}
