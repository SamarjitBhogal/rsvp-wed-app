import { Guest } from '../../../models/Guest.js';
import { Event } from '../../../models/Event.js';
import { createGuestsSchema } from '../../../config/joi-schemas.js';
import { accessGuard } from '../../../middleware/authenticate.js';
import StatusCodes from 'http-status-codes';
import { SubEvent } from '../../../models/SubEvent.js';

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

		const { firstName, lastName, email, subEvents } = req.body;
		const eventID = req.eventID;

		// confirm if already booked if so return message of 'you already booked this event'
		if (await Guest.doesGuestExist(eventID, firstName, email)) {
			return res.status(StatusCodes.CONFLICT).send({ message: 'You have already booked this event.' });
		}

		// get event ID of subEvents
		// add to each sub event the main guest and other guest
		// out of the subevent add the highest head count (including main guest) to parent event
		// done
		let maxAccompanyingHeadCount = subEvents[0].accompanyingHeadCount;

		for (let i = 0; i < subEvents.length; i++) {
			const subEvent = await SubEvent.getSubEventDetails(subEvents[i].eventName);
			let guests = [];
			let mainGuest = new Guest(subEvent.ID, firstName, lastName, email, subEvents[i].accompanyingHeadCount);

			for (let i = NULL_ACCOMPANYING_HEAD_COUNT; i < subEvents[i].accompanyingHeadCount; i++) {
				let guest = new Guest(subEvent.ID, 'Accompanying Guest', lastName, email, NULL_ACCOMPANYING_HEAD_COUNT);
				guests.push(guest);
			}

			try {
				await mainGuest.insertGuest();
				guests.forEach(async (guest) => await guest.insertGuest());

				// update headcount of event
				SubEvent.updateEvent(subEvent.ID, subEvents[i].accompanyingHeadCount + MAIN_GUEST_INCREMENT, eventID);
				if (subEvents[i].accompanyingHeadCount > maxAccompanyingHeadCount) {
					maxAccompanyingHeadCount = subEvents[i].accompanyingHeadCount;
				}
			} catch (error) {
				// database error
				return res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.send({ message: 'Failed to create booking.', error: error });
			}
		}

		Event.updateEvent(eventID, maxAccompanyingHeadCount + MAIN_GUEST_INCREMENT);

		return res.status(StatusCodes.CREATED).send({ message: 'Booking created.' });
	},
];
