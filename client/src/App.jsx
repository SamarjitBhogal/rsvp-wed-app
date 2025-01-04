// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/protected-route/protected-route';
import LandingPage from './pages/landing/landing-page';
import AccessPage from './pages/access/access-page';
import RSVP from './pages/rsvp/rsvp';
import HomePage from './pages/home/home-page';
import { hasAccess } from './utils/authenticate';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	let location = useLocation();

	useEffect(() => {
		const handleAccess = async () => {
			const access = await hasAccess();
			setIsAuthenticated(access);
			setLoading(false); // Stop loading
		};

		handleAccess();
	}, [location]);

	const grantAccess = () => {
		setIsAuthenticated(true);
	};

	const revokeAccess = () => {
		setIsAuthenticated(false);
	};

	if (loading) {
		// Optionally render a loading spinner or placeholder while checking authentication
		return <div>Loading...</div>;
	  }

	return (
		<Routes>
			<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
				{/* TODO: Needs to be a path with the event name */}
				<Route path='/event/:eventName' element={<LandingPage logout={revokeAccess} />} />
				<Route path='/event/:eventName/rsvp'>
					{(params) => <RSVP logout={revokeAccess} eventName={params.eventName} />}
				</Route>
			</Route>

			{/* QR code, this will instantly redirect to rsvp or show error prompt if not valid */}
			{/* <Route path='/event/:eventName/access/:accessCode'>
					{(params) => (
						<AccessPage access={grantAccess} eventName={params.eventName} accessCode={params.accessCode} />
					)}
				</Route> */}

			{/* Manual code entering */}
			<Route path='/event/:eventName/access' element={<AccessPage grantAccess={grantAccess} />} />
			<Route path='/' element={<HomePage />} />
		</Routes>
	);
};

export default App;
