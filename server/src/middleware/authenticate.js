import { config } from 'dotenv';
// import { User } from '../models/user.js';
import { verifyJWT } from '../utils/jwt.js';

config();

/**
 * A middleware that checks user making the request is authorized to that is,
 * the user is authenticated.
 */
export async function accessGuard(req, res, next) {
	const { accessToken } = req.cookies;
	const accessCode = verifyJWT(accessToken);

	if (!accessCode || req.eventID != accessCode.ID || req.eventName != accessCode.name) {
		return res.status(403).send({ message: 'Invalid access. User does not have the required access code for this event.' });
	}

	req.accessCode = accessCode;
	return next();
}

// export async function IsAuthenticated(req, res, next) {
// 	const { accessToken, refreshToken } = req.cookies;
// 	const user = verifyJWT(accessToken);

// 	if (!user) {
// 		const refreshUser = verifyJWT(refreshToken);

// 		if (!refreshUser) {
// 			req.user = null;
// 			return next();
// 		}

// 		if (!(await User.doesUserExist(refreshUser.USER_ID))) {
// 			req.user = null;
// 			return next();
// 		}

// 		req.user = refreshUser;
// 		return next();
// 	}

// 	if (!(await User.doesUserExist(user.USER_ID))) {
// 		req.user = null;
// 		return next();
// 	}

// 	req.user = user;
// 	return next();
// }
