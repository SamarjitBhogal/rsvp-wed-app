// post request for jwt auth session

import { Event } from '../../../../models/Event.js';
import { signJWT } from '../../../../utils/jwt.js';

export const get = async (req, res) => {
	const accessCode = req.params.accessCode;
	const eventName = req.params.eventName;

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventName))) {
		return res.status(404).send({ message: 'This event does not exist.' });
	}

	const eventResult = await Event.getEventDetails(eventName);

	if (!(await Event.checkEventAccess(eventResult.ID, accessCode))) {
		return res.status(400).send({ message: 'Invalid access code / event.' });
	}

	const accessToken = signJWT(eventResult);

	return res.status(200).send({ message: 'Access granted.', value: accessToken });
};
