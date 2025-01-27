import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

function getAuthAxios() {
	const accessToken = sessionStorage.getItem('accessToken');

	return axios.create({
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export const authAxios = getAuthAxios();
export default axios;
