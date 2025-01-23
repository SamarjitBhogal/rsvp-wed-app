// gives event details

import { Event } from '../../../models/Event.js';
import StatusCodes from 'http-status-codes';
import { SubEvent } from '../../../models/SubEvent.js';

// TODO: accessGuard needed

export const get = async (req, res) => {
	const eventName = req.params.eventName;

	if (!(await Event.doesEventExist(eventName))) {
		return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Could not find event.' });
	}

	const parentEventDetails = await Event.getEventDetails(eventName);
	const subEvents = await SubEvent.getSubEvents(parentEventDetails.ID);

	const eventDetails = {
		parentEventName: parentEventDetails.eventName,
		parentEventID: parentEventDetails.parentEventID,
		subEvents: subEvents,
	};

	console.log(subEvents);
	// TODO: attach subevents as array

	return res.status(StatusCodes.OK).send({ message: 'Event found.', value: parentEventDetails });
};
