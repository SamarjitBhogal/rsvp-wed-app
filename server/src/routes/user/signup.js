import { User } from '../../models/user.js';
import { userSignUpSchema } from '../../config/joi-schemas.js';
import { createHashedPassword } from '../../utils/bcrypt.js';
import { signJWT } from '../../utils/jwt.js';

export const post = async (req, res) => {
	const result = userSignUpSchema.validate(req.body);
	if (result.error)
		return res.status(400).send({ message: 'Could not signup.', error: result.error.details[0].message });

	let { userName, userEmail, password } = req.body;

	// check if userEmail is already registered
	if (await User.doesEmailExist(userEmail)) return res.status(409).send({ message: 'Email is already registered.' });

	let user = new User(userName, userEmail, createHashedPassword(password));

	try {
		await user.insertUser();
		console.log('Signup successfull. ', user);
	} catch (error) {
		// database error
		return res.status(500).send({ message: 'Failed to create user.', error: error });
	}

	return res.status(201).send({ message: 'Signup successfull.', accessToken: await signJWT(user) });
};
