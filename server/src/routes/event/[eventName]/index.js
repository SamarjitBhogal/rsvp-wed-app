// gives event details

import { Event } from '../../../models/Event.js';
import StatusCodes from 'http-status-codes';

export const get = async (req, res) => {
	const eventName = req.params.eventName;

	if (!(await Event.doesEventExist(eventName))) {
		return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Could not find event.' });
	}

	const eventDetails = await Event.getEventDetails(eventName);

	return res.status(StatusCodes.OK).send({ message: 'Event found.', value: eventDetails });
};
