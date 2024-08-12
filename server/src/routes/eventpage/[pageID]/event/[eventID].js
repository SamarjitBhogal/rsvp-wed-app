import { Event } from '../../../../models/Event.js';

export const get = async (req, res) => {
	let eventID = req.params.eventID;

	//? NOTE: still need to test
	if (isNaN(eventID)) {
		eventID = decodeNum(eventID);
	}

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventID))) {
		return res.status(404).send({ message: 'This event does not exist.' });
	}

	const result = await Event.getEventDetails(eventID);

	return res.status(200).send({ message: 'Event details found.', value: result });
};

export const post = async (req, res) => {
    
}
