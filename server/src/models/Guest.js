import { db } from '../config/database.js';

export class Guest {
	constructor(subEventID, firstName, lastName, email, accompanyingHeadCount) {
		this.subEventID = subEventID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.accompanyingHeadCount = accompanyingHeadCount;
	}

	async insertGuest() {
		let query = `INSERT INTO Guests(
            subEventID,
            firstName,
			lastName,
            email,
			accompanyingHeadCount
        )
        VALUES(
            '${this.subEventID}',
            '${this.firstName}',
			'${this.lastName}',
            '${this.email}',
			'${this.accompanyingHeadCount}'
        )`;

		return db.execute(query);
	}

	static async doesGuestExist(guest, subEventID) {
		let query = `SELECT subEventID, firstName, email FROM Guests 
            WHERE firstName = '${guest.firstName}' AND lastName = '${guest.lastName}' AND email = '${guest.email}' AND subEventID = ${subEventID}`;
		let [result, _] = await db.execute(query);

		return result.length > 0;
	}
}
