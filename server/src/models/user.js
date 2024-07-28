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
}
