import { Event } from '../../../../../models/Event.js';
import { authToken } from '../../../../../middleware/authenticate.js';
import { pageAuthorization } from '../../../../../middleware/page-access.js';

export const get = [
	authToken,
    pageAuthorization,
	async (req, res) => {
		const pageID = req.pageID;

		const result = await Event.getEvents(pageID);

		return res.status(200).send({ message: 'Events found.', value: result });
	},
];
