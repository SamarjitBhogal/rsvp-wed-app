import { db } from '../config/database.js';
import { uploadImg } from '../utils/cloudinary.js';

// TODO: handle db errors.
const defaultImg = "samples/sheep";

export class LandingPage {
    constructor(userID, pageTitle, pageDesc, pageImg = ""   , pageColor = "#FFFFFF") {
        this.userID = userID;
        this.pageTitle = pageTitle;
        this.pageDesc = pageDesc;
        this.pageColor = pageColor;

        if (pageImg == "" || pageImg == null) {
            this.pageImgLink = defaultImg;
        } else {
            setImg(pageImg);
        }
    }

    insertPage() {
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

    static async setImg(pageImg) {
        this.pageImgLink = await uploadImg(pageImg);
    }
}