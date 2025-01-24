import { db } from '../config/database.js';

export class SubEvent {
	constructor(name, parentEventID) {
		this.name = name;
		this.headCount = 0;
		this.parentEventID = parentEventID;
	}

	static async getSubEventDetails(eventName) {
		let query = `SELECT ID, name, headCount FROM SubEvents WHERE name = '${eventName}'`;
		let [event, _] = await db.execute(query);

		return event[0];
	}

    static async getSubEvents(parentEventID) {
		let query = `SELECT ID, name, headCount FROM SubEvents WHERE parentEvent = '${parentEventID}'`;
		let [event, _] = await db.execute(query);

		return event;
	}

	static async doesEventExist(eventName) {
		const query = `SELECT name FROM SubEvents WHERE name = '${eventName}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].name == eventName
		return result;
	}

	static async updateEvent(eventID, headCount, parentEventID) {
		let query = `UPDATE events SET headCount = headCount + ${headCount} WHERE ID = '${eventID}'`;
		return await db.execute(query);
	}
}
