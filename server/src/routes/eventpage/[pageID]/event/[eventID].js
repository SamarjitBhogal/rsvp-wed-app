import { Event } from '../../../../models/Event.js';
import { Guest } from '../../../../models/Guest.js';
import { LandingPage } from '../../../../models/LandingPage.js';
import { createBookingSchema } from '../../../../config/joi-schemas.js';
import { Booking } from '../../../../models/Booking.js';

export const get = async (req, res) => {
	let eventID = req.params.eventID;

	//? NOTE: still need to test
	// need to ensure only a hash is given
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
	const result = createBookingSchema.validate(req.body);
	if (result.error)
		return res.status(400).send({ message: 'Could not create booking.', error: result.error.details[0].message });

	let pageID = req.params.pageID;
	let eventID = req.params.eventID;

	//? NOTE: still need to test
	// need to ensure only a hash is given
	if (isNaN(pageID)) {
		pageID = decodeNum(pageID);
	}

	//? NOTE: still need to test
	// need to ensure only a hash is given
	if (isNaN(eventID)) {
		eventID = decodeNum(eventID);
	}

	// Confirm if page exists:
	if (!(await LandingPage.doesPageExist(pageID))) {
		return res.status(404).send({ message: 'Could not complete booking the page does not exist.' });
	}

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventID))) {
		return res.status(404).send({ message: 'Could not complete booking the event does not exist.' });
	}

	const { guestName, guestEmail, headCount } = req.body;
	//confirm if already booked if so return message of 'you already booked this event'
	if (await Guest.doesGuestExist(eventID, guestName, guestEmail)) {
		return res.status(409).send({ message: 'You have already booked this event.' });
	}

	let guest = new Guest(eventID, guestName, guestEmail);

	try {
		const guestResult = await guest.insertGuest();
		let booking = new Booking(eventID, guestResult[0].insertId, headCount);

		await booking.insertBooking();
	} catch (error) {
		// database error
		return res.status(500).send({ message: 'Failed to create booking.', error: error });
	}

	return res.status(201).send({ message: 'Booking created.' });
};
