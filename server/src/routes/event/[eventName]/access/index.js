// get to check if user has access

import { accessGuard } from '../../../../middleware/authenticate.js';
import StatusCodes from 'http-status-codes';

export const get = [
	accessGuard,
	(req, res) => {
		if (req.eventName && req.eventID) {
			return res.status(StatusCodes.OK).send({ message: 'Access is valid.' });
		} else {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.send({ message: 'You do not have access to RSVP for this event.' });
		}
	},
];