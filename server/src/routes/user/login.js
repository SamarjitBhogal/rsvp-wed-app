import { User } from '../../models/user.js';
import { userLogInSchema } from '../../config/joi-schemas.js';
import { signJWT, MAX_ACCESS_TIME, MAX_REFRESH_TIME } from '../../utils/jwt.js';
import { compareHashedPasswords } from '../../utils/bcrypt.js';

export const post = async (req, res) => {
	const result = userLogInSchema.validate(req.body);
	if (result.error)
		return res.status(400).send({ message: 'Could not login.', error: result.error.details[0].message });

	let { userEmail, password } = req.body;

	const user = await User.getUser(userEmail);
	if (!user) return res.status(400).send({ message: 'Invalid credentials.' });

	const compareResult = compareHashedPasswords(password, user.UserPassword);
	if (!compareResult) return res.status(400).send({ message: 'Invalid credentials.' });

	const accessToken = signJWT(user, MAX_ACCESS_TIME);
	const refreshToken = signJWT(user, MAX_REFRESH_TIME);

	res.cookie('accessToken', accessToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		maxAge: MAX_ACCESS_TIME,
	});

	res.cookie('refreshToken', refreshToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		maxAge: MAX_REFRESH_TIME,
	});

	//* We coud send back user information from decoded accessToken
	return res.status(200).send({ message: 'Login successfull.' });
};
