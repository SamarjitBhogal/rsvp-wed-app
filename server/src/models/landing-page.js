import { db } from '../config/database.js';
import { uploadImg } from '../utils/cloudinary.js';
import { defaultImg } from '../utils/cloudinary.js';

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

        //TODO: if db error, remove photo from cloudinary.

		return db.execute(query);
	}
}
