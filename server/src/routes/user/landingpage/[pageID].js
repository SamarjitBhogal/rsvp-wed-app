import { LandingPage } from '../../../models/LandingPage.js';
import { authToken } from '../../../middleware/authenticate.js';
import { pageAuthorization } from '../../../middleware/page-access.js';

export const get = [
	authToken,
	pageAuthorization,
	async (req, res) => {
		const pageID = req.pageID;

		const result = await LandingPage.getPageDetails(pageID, req.user);

		return res.status(200).send({ message: 'Landing page details found.', value: result });
	},
];
