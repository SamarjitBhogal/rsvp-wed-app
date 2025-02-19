import EmailConfirmation from '../components/email-confirmation/email-confirmation';
import { authAxios } from './axios';
import { toast } from 'react-toastify';
import { renderToString } from 'react-dom/server';

function getHTML(eventName, firstName, lastName) {
	const htmlAsString = renderToString(<EmailConfirmation eventName={eventName} />);
	return htmlAsString;
}

export async function sendMail(eventName, email, firstName, lastName) {
	const html = getHTML(eventName, firstName, lastName);

	try {
		const result = await authAxios.post(`/event/${eventName}/sendMail`, { email, html });
		toast.info('An email has been sent for your RSVP.');
	} catch (error) {
		console.error(error);
		toast.error('An error occurred while sending the email. Please try again.');
	}
}
