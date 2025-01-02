import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// All links / QR codes will go to this page and make a request (with access code) for auth
// if success we redirect to disired page and

const AccessPage = () => {
	const [userId, setUserId] = useState('');
	const [pass, setPass] = useState('');
	const navigate = useNavigate();

	const handleLogin = () => {
		if (userId === 'user' && pass === 'pass') {
			login(userId, pass);
			navigate('/dashboard');
		}
	};

	return <div>AccessPage You must enter the access code in order to view the event.</div>;
};

export default AccessPage;
