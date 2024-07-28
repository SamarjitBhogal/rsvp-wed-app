import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function createHashedPassword(password) {
	bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
		if (err) console.error(err);
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) console.error(err);
			return hash;
		});
	});
}

export function compareHashedPasswords(password, hash) {
    bcrypt.compare(password, hash, function(err, result) {
        if (err) console.error(err);
        return result;
    });
}
