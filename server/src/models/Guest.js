import { db } from '../config/database.js';

export class Guest {
	constructor(eventID, firstName, lastName, email, accompanyingHeadCount) {
		this.eventID = eventID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.accompanyingHeadCount = accompanyingHeadCount;
	}

	async insertGuest() {
		let query = `INSERT INTO guests(
            eventID,
            firstName,
			lastName,
            email,
			accompanyingHeadCount
        )
        VALUES(
            '${this.eventID}',
            '${this.firstName}',
			'${this.lastName}',
            '${this.email}',
			'${this.accompanyingHeadCount}'
        )`;

		return db.execute(query);
	}

	static async doesGuestExist(eventID, firstName, email) {
		let query = `SELECT ID, firstName, email FROM Guests 
            WHERE firstName = '${firstName}' AND email = '${email}' AND ID = ${eventID}`;
		let [result, _] = await db.execute(query);

		result =
			result.length === 0
				? false
				: result[0].firstName == firstName && result[0].email == email && result[0].ID == eventID;

		return result;
	}
}
