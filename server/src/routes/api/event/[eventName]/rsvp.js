import { Guest } from '../../../../models/Guest.js';
import { Event } from '../../../../models/Event.js';
import { createGuestsSchema } from '../../../../config/joi-schemas.js';
import { accessGuard } from '../../../../middleware/authenticate.js';
import { SubEvent } from '../../../../models/SubEvent.js';
import StatusCodes from 'http-status-codes';

const NULL_ACCOMPANYING_HEAD_COUNT = 0;
const MAIN_GUEST_INCREMENT = 1;

export const post = [
	accessGuard,
	async (req, res) => {
		const result = createGuestsSchema.validate(req.body);

		if (result.error) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ message: 'Could not create booking.', error: result.error.details[0].message });
		}

		const { firstName, lastName, email, subEvents } = req.body;
		const eventID = req.eventID;

		let maxAccompanyingHeadCount = subEvents[0].headCount;
		let bookedEvents = 0;

		for (let i = 0; i < subEvents.length; i++) {
			const subEvent = await SubEvent.getSubEventDetails(subEvents[i].name);
			const guests = [];
			const mainGuest = new Guest(subEvent.ID, firstName, lastName, email, subEvents[i].headCount);

			if (await Guest.doesGuestExist(mainGuest, subEvent.ID)) continue;

			const headCount = subEvents[i].headCount;

			for (let j = NULL_ACCOMPANYING_HEAD_COUNT; j < headCount; j++) {
				const guest = new Guest(subEvent.ID, 'Accompanying Guest', lastName, email, NULL_ACCOMPANYING_HEAD_COUNT);
				guests.push(guest);
			}

			try {
				await mainGuest.insertGuest();
				for (const guest of guests) {
					await guest.insertGuest();
				}

				// update headcount of event
				const updateAmount = headCount + MAIN_GUEST_INCREMENT;
				SubEvent.updateEvent(subEvent.ID, updateAmount);
				if (headCount > maxAccompanyingHeadCount) {
					maxAccompanyingHeadCount = headCount;
				}

				bookedEvents++;
			} catch (error) {
				// database error
				return res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.send({ message: 'Failed to create booking.', error: error });
			}
		}

		if (bookedEvents > 0) {
			Event.updateEvent(eventID, maxAccompanyingHeadCount + MAIN_GUEST_INCREMENT);
		} else {
			return res.status(StatusCodes.CONFLICT).send({ message: 'You have already booked this event.' });
		}

		return res.status(StatusCodes.CREATED).send({ message: 'Booking created.' });
	},
];
