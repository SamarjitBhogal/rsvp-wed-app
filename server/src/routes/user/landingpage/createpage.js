import { LandingPage } from '../../../models/LandingPage.js';
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

		let page = new LandingPage(user.USER_ID, pageTitle, pageDesc, pageImgLink, pageColor);

		try {
			await page.insertPage();
		} catch (error) {
			// database error
			const delResult = await LandingPage.deleteImg(page.pageImgLink);
			if (delResult.result === 'not found') {
				return res
					.status(500)
					.send({ message: 'Failed to create landing page and failed to delete image.', error: error });
			} else {
				return res.status(500).send({ message: 'Failed to create landing page.', error: error });
			}
		}

		return res.status(201).send({ message: 'Landing page created successfully.' });
	},
];
