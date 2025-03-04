import { sendMailSchema } from "../../../../../config/joi-schemas.js";
import { sendEventMail } from "../../../../../utils/sendEventMail.js";
import { accessGuard } from "../../../../../middleware/authenticate.js";
import StatusCodes from 'http-status-codes';

export const post = [
    accessGuard,
    async (req, res) => {
        const result = sendMailSchema.validate(req.body);

		if (result.error) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ message: 'RSVP email could not be sent.', error: result.error.details[0].message });
		}

        const { email, html } = req.body;

        try {
            await sendEventMail(email, html, req.eventName);
            return res.status(StatusCodes.OK).send({ message: 'An email has been sent for your RSVP.' });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: error });
        }
    }
]