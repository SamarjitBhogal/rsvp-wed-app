import { db } from '../config/database.js';

export class Guest {
	constructor(eventID, guestName, guestEmail) {
		this.eventID = eventID;
		this.guestName = guestName;
		this.guestEmail = guestEmail;
	}

	async insertGuest() {
		let query = `INSERT INTO guests(
            EVENT_ID,
            GuestName,
            GuestEmail
        )
        VALUES(
            '${this.eventID}',
            '${this.guestName}',
            '${this.guestEmail}'
        )`;

		return db.execute(query);
	}
}
