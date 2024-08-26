import axios from '../utils/axios';

//login

//logout
export async function logoutUser() {
	try {
		const result = await axios.get('http://localhost:3000/user/logout');
		return result.data;
	} catch (error) {
		console.log('Could not logout user: ' + error);
	}
}

/**
 * Fetches the authenticated user making this request.
 *
 * @returns The authenticated user if it exists else null.
 */
export async function getAuthenticatedUser() {
	try {
		const result = await axios.get('http://localhost:3000/user');
		return result.data.value;
	} catch (error) {
		console.log('Could not get authenticated user: ' + error);
	}
}
