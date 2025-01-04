import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

export function getAuthAxios() {
	const accessToken = sessionStorage.getItem('accessToken');

	return axios.create({
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export default axios;
