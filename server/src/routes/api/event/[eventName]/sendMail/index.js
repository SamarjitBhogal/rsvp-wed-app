import StatusCodes from "http-status-codes";
import { sendMailSchema } from "../../../../../config/joi-schemas.js";
import { sendEventMail } from "../../../../../services/sendEventMail.js";
import { accessGuard } from "../../../../../middleware/authenticate.js";
import { getEmailTemplate, getAttachments } from "../../../../../utils/email.js";

export const post = [
	accessGuard,
	async (req, res) => {
		const result = sendMailSchema.validate(req.body);

		if (result.error) {
			return res.status(StatusCodes.BAD_REQUEST).send({
				message: "RSVP email could not be sent.",
				error: result.error.details[0].message,
			});
		}

		const { email, firstName, lastName, subEventName } = req.body;
		const html = getEmailTemplate(subEventName, firstName, lastName);
		const attachments = getAttachments(subEventName);

		try {
			await sendEventMail(email, html, subEventName, attachments);
			return res
				.status(StatusCodes.OK)
				.send({ message: "An email has been sent for your RSVP." });
		} catch (error) {
			return res.status(StatusCodes.BAD_REQUEST).send({ message: error });
		}
	},
];
