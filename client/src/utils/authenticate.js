import { getAuthAxios } from '../utils/axios';
import { HttpStatusCode } from 'axios';

export async function hasAccess() {
	const authAxios = getAuthAxios();

	try {
		const response = await authAxios.get(`event/priyaWedEvent/access`);
		return response.status === HttpStatusCode.Ok;
	} catch (error) {
		console.error(error.response.data.message);
		return false; // Return false in case of error
	}
}
