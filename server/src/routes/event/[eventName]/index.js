import { Event } from '../../../models/Event.js';
// ! marked for removal
export const get = async (req, res) => {
	let eventName = req.params.eventName;

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventName))) {
		return res.status(404).send({ message: 'This event does not exist.' });
	}

	const result = await Event.getEventDetails(eventName);
	req.eventID = result.ID;

	return res.status(200).send({ message: 'Event details found.', value: result });
};
