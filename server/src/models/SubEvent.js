import { db } from '../config/database.js';

export class SubEvent {
	constructor(name, parentEventID) {
		this.name = name;
		this.headCount = 0;
		this.parentEventID = parentEventID;
	}

	static async getSubEventDetails(eventName) {
		const query = `SELECT ID, name, headCount FROM SubEvents WHERE name = '${eventName}'`;
		const [event, _] = await db.execute(query);

		return event[0];
	}

	static async getSubEvents(parentEventID) {
		const query = `SELECT ID, name, headCount FROM SubEvents WHERE parentEvent = '${parentEventID}'`;
		const [event, _] = await db.execute(query);

		return event;
	}

	static async doesEventExist(eventName) {
		const query = `SELECT name FROM SubEvents WHERE name = '${eventName}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].name === eventName;
		return result;
	}

	static async updateEvent(subEventID, headCount) {
		const query = `UPDATE SubEvents SET headCount = headCount + ${headCount} WHERE ID = ${subEventID}`;
		return await db.execute(query);
	}
}
