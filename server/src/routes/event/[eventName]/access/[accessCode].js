// post request for jwt auth session

import { Event } from '../../../../models/Event.js';
import { signJWT, MAX_ACCESS_TIME } from '../../../../utils/jwt.js';

export const get = async (req, res) => {
	const accessCode = req.params.accessCode;
	const eventName = req.params.eventName;

	// Confirm if event exists:
	if (!(await Event.doesEventExist(eventName))) {
		return res.status(404).send({ message: 'This event does not exist.' });
	}

	const eventResult = await Event.getEventDetails(eventName);
	req.eventID = eventResult.ID;

	// TODO Need to check if bycrpt works here
	if (!Event.checkEventAccess(req.eventID, accessCode)) {
		return res.status(400).send({ message: 'Invalid access code / event.' });
	}

	// JWT it up
	// this token will be sent in a header when rsvping
	// TODO: user-end stores token in sessionStorage if it is lost, this is what is intended
	const accessToken = signJWT(eventResult);

	res.cookie('accessToken', accessToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		maxAge: MAX_ACCESS_TIME,
	});

	return res.status(200).send({ message: 'Event RSVP access granted.' });
};
