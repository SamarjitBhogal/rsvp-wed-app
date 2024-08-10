import { LandingPage } from '../../../models/landing-page.js';
import { authToken } from '../../../middleware/authenticate.js';

export const get = [
	authToken,
	async (req, res) => {
		const user = req.user;
		const pageID = req.params.pageID;

		// Confirm if page exists:
		if (!(await LandingPage.doesPageExist(pageID))) {
			return res.status(404).send({ message: 'This page does not exist.' });
		}

		const result = await LandingPage.getPageDetails(pageID);

		return res.status(200).send({ message: 'Landing page details found.', value: result });
	},
];
