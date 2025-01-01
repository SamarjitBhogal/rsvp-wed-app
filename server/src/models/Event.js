import { db } from '../config/database.js';
import { compareHashedPasswords } from '../utils/bcrypt.js';

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

	/**
	 * Returns a list of all events with the given pageID
	 *
	 * @param {int} pageID The ID to search for events on.
	 * @returns List of all events.
	 * @note Assumes pageID is a valid ID.
	 */
	static async getEvents(pageID) {
		const query = `SELECT * FROM events WHERE LANDPG_ID = ${pageID}`;
		const [result, _] = await db.execute(query);
		return result;
	}

	/**
	 * Returns an event from the database that corresponds to the given pageID and eventID.
	 *
	 * @param {int} pageID The page ID of the event.
	 * @param {int} eventID	The event ID of the event.
	 * @returns An event as a JSON object.
	 */
	static async getEvent(pageID, eventID) {
		const query = `SELECT * FROM events WHERE LANDPG_ID = ${pageID} AND EVENT_ID = ${eventID}`;
		const [result, _] = await db.execute(query);
		return result[0];
	}

	static async getEventDetails(eventName) {
		let query = `SELECT * FROM events WHERE name = '${eventName}'`;
		let [event, _] = await db.execute(query);

		return event[0];
	}

	static async getLimitedEventDetails(eventID) {
		let query = `SELECT EventName, EventDesc, EventStart, EventEnd FROM events WHERE EVENT_ID = '${eventID}'`;
		let [event, _] = await db.execute(query);

		return event[0];
	}

	static async doesEventExist(eventName) {
		let query = `SELECT name FROM Events 
            WHERE name = '${eventName}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].name == eventName;

		return result;
	}

	static async updateEvent(eventID, headCount) {
		let query = `UPDATE events SET headCount = headCount + ${headCount} WHERE ID = '${eventID}'`;
		return await db.execute(query);
	}

	static async checkEventAccess(eventID, accessCode) {
		const query = `SELECT accessCode FROM events WHERE ID = ${eventID}`;
		const [result, _] = await db.execute(query);
		const codeHash = result[0].accessCode

		const compareResult = compareHashedPasswords(accessCode, codeHash);

		return compareResult;
	}
}
