import { LandingPage } from '../../../models/LandingPage.js';
import { authToken } from '../../../middleware/authenticate.js';

export const get = [
	authToken,
	async (req, res) => {
		const userID = req.userID;

		// get all pages

		return res.status(200).send({ message: 'Pages found.', value: result });
	},
];
