import axios from '../../utils/axios.js';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// All links / QR codes will go to this page and make a request (with access code) for auth
// if success we redirect to disired page and

const AccessPage = (props) => {
	const { eventName, accessCode } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('eventName: ', eventName);
		console.log('accessCode: ', accessCode);

		const handleAccess = async () => {
			try {
				const result = await axios.get(`event/${eventName}/access/${accessCode}`);

				sessionStorage.setItem('accessToken', result.data.value);
				props.grantAccess();

				toast.success(result.data.message);
				navigate(`/event/${eventName}`);
			} catch (error) {
				toast.error('Invalid access code / event.');
				console.error(error);
			}
		};

		handleAccess();
	}, []);

	return <>Blank for now</>;
};

export default AccessPage;
