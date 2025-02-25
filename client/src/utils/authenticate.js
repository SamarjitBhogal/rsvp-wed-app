import axios from '../utils/axios';
import { HttpStatusCode } from 'axios';

export async function hasAccess() {
	const storedEventName = sessionStorage.getItem('eventName');

	if (storedEventName) {
		const result = await checkAccess(storedEventName);
		return result;
	}

	// Extract event name from the URL
	const urlSegments = window.location.pathname.split('/');
	const eventName = urlSegments.includes('event') ? urlSegments[urlSegments.indexOf('event') + 1] : null;

	if (!eventName) {
		return false;
	}

	const result = await checkAccess(eventName);
	return result;
}

const checkAccess = async (eventName) => {
	try {
		const response = await axios.get(`event/${eventName}/access`);
		return response.status === HttpStatusCode.Ok;
	} catch (error) {
		console.error(error.response.data.message);
		return false;
	}
}
