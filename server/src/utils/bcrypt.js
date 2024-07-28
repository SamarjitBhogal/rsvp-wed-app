import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function createHashedPassword(password) {
	const salt = bcrypt.genSaltSync(SALT_ROUNDS);
	return bcrypt.hashSync(password, salt);
}

export function compareHashedPasswords(password, hash) {
	return bcrypt.compareSync(password, hash);
}
