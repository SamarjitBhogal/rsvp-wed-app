import { LandingPage } from '../../../models/landing-page.js';
import { User } from '../../../models/user.js';
import { createPageSchema } from '../../../config/joi-schemas.js';

export const post = async (req, res) => {
	const result = createPageSchema.validate(req.body);
	if (result.error) {
		return res
			.status(400)
			.send({ message: 'Could not create event landing page.', error: result.error.details[0].message });
	}

	let { userID, pageTitle, pageDesc, pageColor, pageImgLink } = req.body;

    // Check if userID is the user.
};
