import EmailConfirmation from '../components/email-confirmation/email-confirmation';
import { authAxios } from './axios';
import { toast } from 'react-toastify';
import { renderToString } from 'react-dom/server';

function getHTML(subEventName, firstName, lastName) {
	const htmlAsString = renderToString(
		<EmailConfirmation eventName={subEventName} firstName={firstName} lastName={lastName} />,
	);
	return htmlAsString;
}

export async function sendMail(subEvents, eventName, email, firstName, lastName) {
	for (const subEvent of subEvents) {
		const html = getHTML(subEvent.name, firstName, lastName);

		try {
			await authAxios.post(`/event/${eventName}/sendMail`, { email, html });
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while sending the email. Please try again.');
		}
	}
}
