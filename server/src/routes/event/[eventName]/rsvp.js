import { Guest } from '../../../models/Guest.js';
import { Event } from '../../../models/Event.js';
import { createGuestsSchema } from '../../../config/joi-schemas.js';
import { accessGuard } from '../../../middleware/authenticate.js';
import StatusCodes from 'http-status-codes';

const NULL_ACCOMPANYING_HEAD_COUNT = 0;
const MAIN_GUEST_INCREMENT = 1;

export const post = [
	accessGuard,
	async (req, res) => {
		// each guest is JOI checked
		const result = createGuestsSchema.validate(req.body);

		if (result.error) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ message: 'Could not create booking.', error: result.error.details[0].message });
		}

		const { eventID, firstName, lastName, email, accompanyingHeadCount } = req.body;

		if (eventID != req.eventID) {
			return res.status(StatusCodes.BAD_REQUEST).send({ message: 'You do not have access to this event.' });
		}

		// confirm if already booked if so return message of 'you already booked this event'
		if (await Guest.doesGuestExist(eventID, firstName, email)) {
			return res.status(StatusCodes.CONFLICT).send({ message: 'You have already booked this event.' });
		}

		// create guests
		let guests = [];
		let mainGuest = new Guest(eventID, firstName, lastName, email, accompanyingHeadCount);

		for (let i = NULL_ACCOMPANYING_HEAD_COUNT; i < accompanyingHeadCount; i++) {
			let guest = new Guest(eventID, 'Accompanying Guest', lastName, email, NULL_ACCOMPANYING_HEAD_COUNT);
			guests.push(guest);
		}

		try {
			const guestResult = await mainGuest.insertGuest();
			guests.forEach((guest) => guest.insertGuest());

			// update headcount of event
			Event.updateEvent(eventID, accompanyingHeadCount + MAIN_GUEST_INCREMENT);
		} catch (error) {
			// database error
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send({ message: 'Failed to create booking.', error: error });
		}

		return res.status(StatusCodes.CREATED).send({ message: 'Booking created.' });
	},
];
