import { Event } from '../../../../../models/Event.js';
import { authToken } from '../../../../../middleware/authenticate.js';
import { pageAuthorization } from '../../../../../middleware/page-access.js';

export const get = [
	authToken,
	pageAuthorization,
	async (req, res) => {
		const eventID = req.params.eventID;
		const pageID = req.pageID;

		const result = await Event.getEvent(pageID, eventID);

        if (!result) {
            return res.status(404).send({ message: 'This event does not exist.' });
        }

		return res.status(200).send({ message: 'Event details found.', value: result });
	},
];
