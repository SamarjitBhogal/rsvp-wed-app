import { config } from 'dotenv';
import { Event } from '../models/Event.js';
import { verifyJWT } from '../utils/jwt.js';

config();

/**
 * Checks for auth and event existence.
 */
export async function accessGuard(req, res, next) {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

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
