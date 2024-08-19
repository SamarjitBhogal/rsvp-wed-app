import { authToken } from '../../middleware/authenticate.js';

export const get = [
	authToken,
	(req, res) => {
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		return res.status(200).send({ message: 'Logout successful.' });
	},
];
