import { getAuthAxios } from '../utils/axios';
import { HttpStatusCode } from 'axios';

export async function hasAccess() {
	const authAxios = getAuthAxios();

	// Extract event name from the URL
	const urlSegments = window.location.pathname.split('/');
	const eventName = urlSegments.includes('event') ? urlSegments[urlSegments.indexOf('event') + 1] : null;

	if (!eventName) {
		return false;
	}

	try {
		const response = await authAxios.get(`event/${eventName}/access`);
		return response.status === HttpStatusCode.Ok;
	} catch (error) {
		console.error(error.response.data.message);
		return false;
	}
}
