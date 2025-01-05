// find an event
// return status OK with event details
// ! marked for removal

import { eventFinderSchema } from '../../../config/joi-schemas.js';
import { Event } from '../../../models/Event.js';
import StatusCodes from 'http-status-codes';

export const post = async (req, res) => {
	const result = eventFinderSchema.validate(req.body);

	if (result.error) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ message: 'Could not find event.', error: result.error.details[0].message });
	}

	const { eventName } = req.body;

	if (!(await Event.doesEventExist(eventName))) {
		return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Could not find event.' });
	}

	const eventDetails = await Event.getEventDetails(eventName);

	return res.status(StatusCodes.OK).send({ message: 'Event found.', value: eventDetails });
};
