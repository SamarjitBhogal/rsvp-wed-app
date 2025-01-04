import axios from '../utils/axios';
import { useParams } from 'react-router-dom';

export async function hasAccess() {
	const { eventName } = useParams();

	try {
		const response = await axios.get(`http://localhost:3000/event/${eventName}/access/`);
	} catch (error) {
		return false;
	}
}
