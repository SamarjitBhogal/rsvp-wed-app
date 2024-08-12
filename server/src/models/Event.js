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
}
