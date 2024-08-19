import { authToken } from '../../middleware/authenticate.js';
import { User } from '../models/user.js';

/**
 * Returns user information of the user making the request.
 */
export const get = [
	// TODO: this commit has a bug and this middleware is causing it. Make another middleware that returns the user or null if there is no user at this route
	// Posibilly do this middleware if there is a user
	authToken,
	(req, res) => {
		const user = req.user;
		return res.status(200).send({ message: 'User is authorized.', value: user });
	},
];
