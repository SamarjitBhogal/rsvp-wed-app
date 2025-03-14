import { transporter } from "../config/email-transporter.js";
import { config } from "dotenv";

config();

export const sendEventMail = async (
	recipient,
	html,
	eventName,
	attachments,
) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: recipient,
		subject: `RSVP for ${eventName}`,
		html,
		attachments,
	};

	return await transporter.sendMail(mailOptions);
};
