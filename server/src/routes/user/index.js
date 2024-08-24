import { IsAuthenticated } from '../../middleware/authenticate.js';

/**
 * Returns user information of the user making the request only if the user is authenticated.
 */
export const get = [
	IsAuthenticated,
	(req, res) => {
		const user = req.user;
		if (user) {
			return res.status(200).send({ message: 'User is authorized.', value: user });
		} else {
			return res.status(200).send({ message: 'User is not authorized.', value: user });
		}
	},
];
