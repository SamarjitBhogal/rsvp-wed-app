import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import LandingPage from './pages/landing/landing-page';
import RSVP from './pages/rsvp/rsvp';
import HomePage from './pages/home/home-page';
import Page404 from './pages/404/404-page';

import ProtectedRoute from './components/protected-route/protected-route';
import LoaderFull from './components/loader/loader-full';

import { hasAccess } from './utils/authenticate';
import Header from './components/header/header';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleAccess = async () => {
			const access = await hasAccess();
			setIsAuthenticated(access);
		};

		setIsAuthenticated(null);
		handleAccess();
	}, []);

	const grantAccess = () => {
		setIsAuthenticated(true);
	};

	const revokeAccess = () => {
		setIsAuthenticated(false);
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('eventName');
		navigate('/');
	};

	return (
		<>
			<LoaderFull />
			<Routes>
				<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
					<Route path='/event/:eventName' element={<LandingPage />} />
					<Route path='/event/:eventName/rsvp' element={<RSVP logout={revokeAccess} />} />
				</Route>

				{/* Homepage and Manual code entering + QR code */}
				<Route path='/' element={<HomePage grantAccess={grantAccess} />} />
				<Route path='/event/:eventName/access/:accessCode' element={<HomePage grantAccess={grantAccess} />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</>
	);
};

export default App;
