import axios from '../utils/axios';

//login
export async function loginUser(event) {
	try {
		const result = await axios.post('http://localhost:3000/user/login', {
			userEmail: event.target[0].value,
			password: event.target[1].value,
		});
		localStorage.setItem('authenticated', true);
		return result.data;
	} catch (error) {
		console.log('Could not login user: ' + error);
	}
}

//logout
export async function logoutUser() {
	try {
		const result = await axios.get('http://localhost:3000/user/logout');
		localStorage.setItem('authenticated', false);
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
		localStorage.setItem('authenticated', true);
		return result.data.value;
	} catch (error) {
		console.log('Could not get authenticated user: ' + error);
	}
}
