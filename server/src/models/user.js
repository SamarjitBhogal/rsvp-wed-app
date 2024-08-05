import { db } from '../config/database.js';

// TODO: handle db errors.

export class User {
	constructor(userName, userEmail, password) {
		this.UserName = userName;
		this.UserEmail = userEmail;
		this.UserPassword = password;
	}

	async insertUser() {
		let query = `INSERT INTO users(
            UserName,
            UserEmail,
            UserPassword
        )
        VALUES(
            '${this.UserName}',
            '${this.UserEmail}',
            '${this.UserPassword}'
        )`;
		const result = await db.execute(query);
		this.USER_ID = result[0].insertId;
		return result;
	}

	static async getUser(userEmail) {
		let query = `SELECT USER_ID, UserName, UserEmail, UserPassword FROM users 
			WHERE UserEmail = '${userEmail}'`;

		let [result, _] = await db.execute(query);
		return result[0];
	}

	static async doesUserExist(userID) {
		let query = `SELECT USER_ID FROM users 
            WHERE USER_ID='${userID}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].USER_ID === userID;
		return result;
	}

	static async doesEmailExist(userEmail) {
		let query = `SELECT UserEmail FROM users 
            WHERE UserEmail='${userEmail}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].UserEmail === userEmail;
		return result;
	}
}
