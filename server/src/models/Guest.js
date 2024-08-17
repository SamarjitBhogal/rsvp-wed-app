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

	static async doesGuestExist(eventID, guestName, guestEmail) {
		let query = `SELECT EVENT_ID, GuestName, GuestEmail FROM guests 
            WHERE GuestName = '${guestName}' AND GuestEmail = '${guestEmail}' AND EVENT_ID = ${eventID}`;
		let [result, _] = await db.execute(query);

		result =
			result.length === 0
				? false
				: result[0].GuestName == guestName &&
				  result[0].GuestEmail == guestEmail &&
				  result[0].EVENT_ID == eventID;

		return result;
	}
}
