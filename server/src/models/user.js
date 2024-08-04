import { db } from '../config/database.js';

export class User {
	constructor(userName, userEmail, password) {
		this.userName = userName;
		this.userEmail = userEmail;
		this.password = password;
	}

	createUser() {
		let query = `INSERT INTO users(
            UserName,
            UserEmail,
            UserPassword
        )
        VALUES(
            '${this.userName}',
            '${this.userEmail}',
            '${this.password}'
        )`;
		return db.execute(query);
	}

	static async getUser(userEmail) {
		let query = `SELECT USER_ID, UserName, UserEmail, UserPassword FROM users 
			WHERE UserEmail = '${userEmail}'`;

		let [result, _] = await db.execute(query);
		return result[0];
	}

	//TODO: remove and use getUser
	static async getUserID(userName, userEmail) {
		let query = `SELECT USER_ID FROM users 
            WHERE UserEmail = '${userEmail}' 
            AND UserName = '${userName}'`;

		let [result, _] = await db.execute(query);
		return result[0];
	}

	static async doesEmailExist(userEmail) {
		let query = `SELECT UserEmail FROM users 
            WHERE UserEmail='${userEmail}'`;
		let [result, _] = await db.execute(query);

		result = result.length === 0 ? false : result[0].UserEmail === userEmail;
		return result;
	}
}
