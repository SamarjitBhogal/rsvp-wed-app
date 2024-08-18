import { LandingPage } from '../../../models/LandingPage.js';
import { authToken } from '../../../middleware/authenticate.js';

export const get = [
	authToken,
	async (req, res) => {
		const user = req.user;

		const result = await LandingPage.getPages(user.USER_ID);

		return res.status(200).send({ message: 'Pages found.', value: result });
	},
];
