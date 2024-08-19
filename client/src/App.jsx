import { useState, useEffect } from 'react';

import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';

import { getAuthenticatedUser } from './utils/authenticate';

import Header from './components/header/header';
import LandingPage from './pages/landing/landing-page';
import SignupPage from './pages/signup/signup';
import LoginPage from './pages/login/login';

/**
 * ! -----------------------------------------------------!
 * ! REFER TO INDEX.JS /USER/ TO FIX MIDDLEWARE BUG
 * ! GOAL: SEPERATE ROUTES THAT NEED AUTHENTICATION
 * ! -----------------------------------------------------!
 */

const App = () => {
	//let location = useLocation();
	const [authenticatedUser, setAuthenticatedUser] = useState();

	useEffect(async () => {
		const user = await getAuthenticatedUser();
		setAuthenticatedUser(user);
	}, [window.location]);

	const authRouter = createBrowserRouter([
		{ path: '/', element: <LandingPage /> },
		{ path: '/home', element: <h1>HOME</h1> },
	]);

	const router = createBrowserRouter([
		{ path: '/', element: <LandingPage /> },
		{ path: '/signup', element: <SignupPage /> },
		{ path: '/login', element: <LoginPage /> },
	]);

	const authRoutes = (
		<>
			<RouterProvider router={authRouter} />
		</>
	);

	const routes = (
		<>
			<Header />
			<RouterProvider router={router} />
		</>
	);

	return (
		//TODO: Authenticated routes and non-authenticated routes.
		<>
			{authenticatedUser ? authRoutes : routes}
		</>
	);
};

export default App;
