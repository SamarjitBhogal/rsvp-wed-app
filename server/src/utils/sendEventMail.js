import { transporter } from '../config/email-transporter.js';
import { config } from 'dotenv';

config();

export const sendEventMail = async (recipient, html, eventName) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: recipient,
		subject: `RSVP for ${eventName}`,
		html,
	};

	return await transporter.sendMail(mailOptions);
};
