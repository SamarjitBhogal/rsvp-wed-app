import { config } from 'dotenv';
// import { User } from '../models/user.js';
import { Event } from '../models/Event.js';
import { verifyJWT } from '../utils/jwt.js';

config();

/**
 * Checks for auth and event existence. 
 */
export async function accessGuard(req, res, next) {
	const { accessToken } = req.cookies;
	const accessCode = verifyJWT(accessToken);

	if (!accessCode) {
		return res
			.status(403)
			.send({ message: 'Invalid access. User does not have the required access code for this event.' });
	}

	const eventName = req.params.eventName;

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventName))) {
		return res.status(404).send({ message: 'This event does not exist.' });
	}

	const eventResult = await Event.getEventDetails(eventName);

	if (eventResult.ID != accessCode.ID || eventResult.name != accessCode.name) {
		return res
			.status(403)
			.send({ message: 'Invalid access. User does not have the required access code for this event.' });
	}

	req.eventName = eventResult.name;
	req.eventID = eventResult.ID;
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
