import axios from 'axios';

axios.defaults.withCredentials = true;
axios.baseURL = 'http://localhost:3000';

export function getAuthAxios() {
	const accessToken = sessionStorage.getItem('accessToken');

	const authAxios = axios.create({
		baseURL: 'http://localhost:3000',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return authAxios;
}

export default axios;
