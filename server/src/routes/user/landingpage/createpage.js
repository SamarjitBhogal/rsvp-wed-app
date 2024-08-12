import { LandingPage } from '../../../models/LandingPage.js';
import { Event } from '../../../models/Event.js';
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

		let { pageTitle, pageDesc, pageColor, pageImgLink, events } = req.body;

		let page = new LandingPage(user.USER_ID, pageTitle, pageDesc, pageImgLink, pageColor);

		try {
			const pageResult = await page.insertPage();

			events.forEach(async (e) => {
				let event = new Event(pageResult[0].insertId, e.eventName, e.eventDesc, e.eventStart, e.eventEnd);
				await event.insertEvent();
			});
		} catch (error) {
			// database error
			//? move page inside LandingPage
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
