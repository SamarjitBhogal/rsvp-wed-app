import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: process.env.EMAIL_HOST,
	port: 587,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});
