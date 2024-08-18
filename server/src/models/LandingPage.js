import { db } from '../config/database.js';
import { uploadImg, defaultImg, deleteImg } from '../utils/cloudinary.js';

export class LandingPage {
	constructor(userID, pageTitle, pageDesc, pageImg = '', pageColor = '#FFFFFF') {
		this.userID = userID;
		this.pageTitle = pageTitle;
		this.pageDesc = pageDesc;
		this.pageColor = pageColor;
		this.pageImgLink = pageImg;
	}

	async insertPage() {
		if (this.pageImgLink == '' || this.pageImgLink == null) {
			this.pageImgLink = defaultImg;
		} else {
			this.pageImgLink = await uploadImg(this.pageImgLink);
		}

		let query = `INSERT INTO landingpages(
            USER_ID,
            PageTitle,
            PageDesc,
            PageImageLink,
            PageColor
        )
        VALUES(
            '${this.userID}',
            '${this.pageTitle}',
            '${this.pageDesc}',
            '${this.pageImgLink}',
            '${this.pageColor}'
        )`;

		return db.execute(query);
	}

	async deletePage(pageID) {
		let query = `SELECT PageImageLink FROM landingpages WHERE LANDPG_ID = '${pageID}'`;

		let [result, _] = await db.execute(query);
		const publicID = result[0].PageImageLink;

		if (publicID != defaultImg) {
			await deleteImg(result[0].PageImageLink);
		}

		query = `DELETE FROM landingpages WHERE LANDPG_ID = '${pageID}'`;

		return db.execute(query);
	}

	/**
	 * Returns a list of all pages with the given userID
	 * 
	 * @param {int} userID The ID to search for pages on.
	 * @returns List of all pages.
	 * @note Assumes userID is a valid ID.
	 */
	static async getPages(userID) {
		const query = `SELECT * FROM landingpages WHERE USER_ID = ${userID}`;
		const [result, _] = await db.execute(query);
		return result;
	}

	static async getPageDetails(pageID, userID = null) {
		if (!userID) return this.getLimitedDetails(pageID);

		let query = `SELECT * FROM landingpages WHERE LANDPG_ID = '${pageID}'`;
		let [result, _] = await db.execute(query);

		query = `SELECT * FROM events WHERE LANDPG_ID = '${pageID}'`;
		let [events, _2] = await db.execute(query);
		result[0].events = events;

		return result[0];
	}

	static async getLimitedDetails(pageID) {
		let query = `SELECT PageTitle, PageDesc, PageImageLink, PageColor FROM landingpages WHERE LANDPG_ID = '${pageID}'`;
		let [result, _] = await db.execute(query);

		query = `SELECT EventName, EventDesc, EventStart, EventEnd FROM events WHERE LANDPG_ID = '${pageID}'`;
		let [events, _2] = await db.execute(query);
		result[0].events = events;

		return result[0];
	}

	static async deleteImg(pageImgLink) {
		const result = await deleteImg(pageImgLink);
		return result;
	}

	static async doesPageExist(pageID) {
		let query = `SELECT LANDPG_ID FROM landingpages 
            WHERE LANDPG_ID = '${pageID}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].LANDPG_ID == pageID;

		return result;
	}

	static async doesUserOwnPage(userID, pageID) {
		let query = `SELECT LANDPG_ID FROM landingpages 
            WHERE LANDPG_ID = '${pageID}' AND USER_ID = '${userID}'`;

		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].LANDPG_ID == pageID;

		return result;
	}
}
