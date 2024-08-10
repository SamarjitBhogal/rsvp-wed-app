import { db } from '../config/database.js';
import { uploadImg, defaultImg, deleteImg } from '../utils/cloudinary.js';

// TODO: handle db errors.

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
		let query = `DELETE FROM landingpages WHERE LANDPG_ID = '${pageID}'`;

		return db.execute(query);
	}

	static async deleteImg(pageImgLink) {
		const result = await deleteImg(pageImgLink);
		return result;
	}
}
