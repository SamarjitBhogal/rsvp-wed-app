import { db } from '../config/database.js';
import { compareHashedPasswords } from '../utils/bcrypt.js';

export class Event {
	constructor(name) {
		this.name = name;
		this.headCount = 0;
	}

	static async getEventDetails(eventName) {
		const query = `SELECT ID, name, headCount FROM Events WHERE name = '${eventName}'`;
		const [event, _] = await db.execute(query);
		
		return event[0];
	}

	static async doesEventExist(eventName) {
		const query = `SELECT name FROM Events WHERE name = '${eventName}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].name === eventName;
		return result;
	}

	static async updateEvent(eventID, headCount) {
		const query = `UPDATE Events SET headCount = headCount + ${headCount} WHERE ID = '${eventID}'`;
		return await db.execute(query);
	}

	static async checkEventAccess(eventID, accessCode) {
		const query = `SELECT accessCode FROM Events WHERE ID = ${eventID}`;
		const [result, _] = await db.execute(query);
		const codeHash = result[0].accessCode;
		const compareResult = compareHashedPasswords(accessCode, codeHash);

		return compareResult;
	}
}
