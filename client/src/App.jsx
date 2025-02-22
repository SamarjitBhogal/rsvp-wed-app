import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/landing/landing-page';
import AccessPage from './pages/access/access-page';
import RSVP from './pages/rsvp/rsvp';
import HomePage from './pages/home/home-page';
import Page404 from './pages/404/404-page';

import ProtectedRoute from './components/protected-route/protected-route';
import { hasAccess } from './utils/authenticate';
import Loader from './components/loader/loader';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const handleAccess = async () => {
			const access = await hasAccess();
			setIsAuthenticated(access);
			console.log('is authenticated:', access);
		};

		setIsAuthenticated(null);
		handleAccess();
	}, []);

	const grantAccess = () => {
		setIsAuthenticated(true);
	};

	const revokeAccess = () => {
		setIsAuthenticated(false);
	};

	return (
		<>
			<Loader />
			<Routes>
				<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
					<Route path='/event/:eventName' element={<LandingPage logout={revokeAccess} />} />
					<Route path='/event/:eventName/rsvp' element={<RSVP logout={revokeAccess} />} />
				</Route>

				{/* QR code, this will instantly redirect to rsvp or show error prompt if not valid */}
				{/* <Route path='/event/:eventName/access/:accessCode' element={<AccessPage grantAccess={grantAccess} />} /> */}

				{/* Homepage and Manual code entering */}
				<Route path='/' element={<HomePage grantAccess={grantAccess} />} />
				<Route path='/event/:eventName/access/:accessCode' element={<HomePage grantAccess={grantAccess} />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</>
	);
};

export default App;
