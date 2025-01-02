// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/protected-route/protected-route';
import LandingPage from './pages/landing/landing-page';
import AccessPage from './pages/access/access-page';
import RSVP from './pages/rsvp/rsvp';
import HomePage from './pages/home/home-page';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const grantAccess = () => {
		setIsAuthenticated(true);
	};

	const revokeAccess = () => {
		setIsAuthenticated(false);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
					{/* TODO: Needs to be a path with the event name */}
					<Route path='/event/:eventName'>
						{(params) => <LandingPage logout={revokeAccess} eventName={params.eventName} />}
					</Route>
					<Route path='/event/:eventName/rsvp'>
						{(params) => <RSVP logout={revokeAccess} eventName={params.eventName} />}
					</Route>
				</Route>

				{/* QR code, this will instantly redirect to rsvp or show error prompt if not valid */}
				<Route path='/event/:eventName/access/:accessCode'>
					{(params) => (
						<AccessPage access={grantAccess} eventName={params.eventName} accessCode={params.accessCode} />
					)}
				</Route>

				{/* Manual code entering */}
				<Route path='/event/:eventName/access/'>
					{(params) => (
						<AccessPage access={grantAccess} eventName={params.eventName} accessCode={params.accessCode} />
					)}
				</Route>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
