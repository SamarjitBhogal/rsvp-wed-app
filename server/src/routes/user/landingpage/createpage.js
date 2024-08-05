import { LandingPage } from '../../../models/landing-page.js';
import { User } from '../../../models/user.js';
import { createPageSchema } from '../../../config/joi-schemas.js';
import { authToken } from '../../../middleware/authenticate.js';

export const post = [
	authToken,
	async (req, res) => {
		const result = createPageSchema.validate(req.body);
		const user = req.user;

		if (result.error) {
			return res
				.status(400)
				.send({ message: 'Could not create event landing page.', error: result.error.details[0].message });
		}

		let { pageTitle, pageDesc, pageColor, pageImgLink } = req.body;

		// Check if user exists.
		if (!(await User.doesUserExist(user.USER_ID))) return res.status(404).send({ message: 'User does not exist.' });

		let page = new LandingPage(user.USER_ID, pageTitle, pageDesc, pageImgLink, pageColor);

		// TODO: handle db error in models.
		try {
			await page.insertPage();
		} catch (error) {
			// database error
			return res.status(500).send({ message: 'Failed to create landing page.', error: error });
		}

		return res.status(201).send({ message: 'Landing page created successfully.' });
	},
];
