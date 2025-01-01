import { Guest } from '../../../models/Guest.js';
import { Event } from '../../../models/Event.js';
import { createGuestsSchema } from '../../../config/joi-schemas.js';

const NULL_ACCOMPANYING_HEAD_COUNT = 0;
const MAIN_GUEST_INCREMENT = 1;

// TODO: need middleware to ensure we have valid JWT session
export const post = async (req, res) => {
	// each guest is JOI checked
	const result = createGuestsSchema.validate(req.body);

	if (result.error) {
		return res.status(400).send({ message: 'Could not create booking.', error: result.error.details[0].message });
	}

	let eventName = req.params.eventName;

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventName))) {
		return res.status(404).send({ message: 'Could not complete booking the event does not exist.' });
	}

	const { eventID, firstName, lastName, email, accompanyingHeadCount } = req.body;

	// confirm if already booked if so return message of 'you already booked this event'
	if (await Guest.doesGuestExist(eventID, firstName, email)) {
		return res.status(409).send({ message: 'You have already booked this event.' });
	}

	// create guests
	let guests = [];
	let mainGuest = new Guest(eventID, firstName, lastName, email, accompanyingHeadCount);

	for (let i = NULL_ACCOMPANYING_HEAD_COUNT; i < accompanyingHeadCount; i++) {
		let guest = new Guest(eventID, 'Accompanying Guest', lastName, email, 0);
		guests.push(guest);
	}

	try {
		const guestResult = await mainGuest.insertGuest();
		guests.forEach((guest) => guest.insertGuest());

		// update headcount of event
		Event.updateEvent(eventID, accompanyingHeadCount + MAIN_GUEST_INCREMENT);
	} catch (error) {
		// database error
		return res.status(500).send({ message: 'Failed to create booking.', error: error });
	}

	return res.status(201).send({ message: 'Booking created.' });
};
