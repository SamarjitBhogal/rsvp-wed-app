import { db } from '../config/database.js';
import { Event } from './Event.js';

export class Booking {
	constructor(eventID, guestID, headCount) {
		this.eventID = eventID;
		this.guestID = guestID;
		this.headCount = headCount;
	}

	async insertBooking() {
		let query = `INSERT INTO bookings(
            EVENT_ID,
            GUEST_ID,
            HeadCount
        )
        VALUES(
            '${this.eventID}',
            '${this.guestID}',
            '${this.headCount}'
        )`;

		await db.execute(query);
        await Event.updateEvent(this.eventID, this.headCount);
	}
}
