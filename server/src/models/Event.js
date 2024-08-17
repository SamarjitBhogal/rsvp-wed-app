import { db } from '../config/database.js';

export class Event {
	constructor(pageID, eventName, eventDesc, eventStart, eventEnd) {
		this.pageID = pageID;
		this.eventName = eventName;
		this.eventDesc = eventDesc;
		this.eventStart = eventStart;
		this.eventEnd = eventEnd;
		this.eventCount = 0;
	}

	async insertEvent() {
		let query = `INSERT INTO events(
            LANDPG_ID,
            EventName,
            EventDesc,
            EventStart,
            EventEnd,
            EventCount
        )
        VALUES(
            '${this.pageID}',
            '${this.eventName}',
            '${this.eventDesc}',
            '${this.eventStart}',
            '${this.eventEnd}',
            '${this.eventCount}'
        )`;

		return db.execute(query);
	}

	static async getEventDetails(eventID, userID = null) {
		if (!userID) return this.getLimitedEventDetails(eventID);

		let query = `SELECT * FROM events WHERE EVENT_ID = '${eventID}'`;
		let [event, _] = await db.execute(query);

		return event[0];
	}

	static async getLimitedEventDetails(eventID) {
		let query = `SELECT EventName, EventDesc, EventStart, EventEnd FROM events WHERE EVENT_ID = '${eventID}'`;
		let [event, _] = await db.execute(query);

		return event[0];
	}

	static async doesEventExist(eventID) {
		let query = `SELECT EVENT_ID FROM events 
            WHERE EVENT_ID = '${eventID}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].EVENT_ID == eventID;

		return result;
	}

	static async updateEvent(eventID, headCount) {
		let query = `UPDATE events SET EventCount = EventCount + ${headCount} WHERE EVENT_ID = '${eventID}'`;
		return await db.execute(query);
	}
}
