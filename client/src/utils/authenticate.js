import axios from 'axios';

//login

//logout

/**
 * Fetches the authenticated user making this request.
 *
 * @returns The authenticated user if it exists else null.
 */
export async function getAuthenticatedUser() {
	try {
		const result = axios.get('http://localhost:3000/user');
		if (result) {
			console.log('here');
			return result.value;
		} else {
			return null;
		}
	} catch (error) {
		return error;
	}
}
