import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAuthenticatedUser } from './utils/authenticate';

import Header from './components/header/header';
import LandingPage from './pages/landing/landing-page';
import SignupPage from './pages/signup/signup';
import LoginPage from './pages/login/login';
import HeaderAfterLogin from './components/header/header-after-login';
import ProtectedRoute from './components/protected-route/protected-route';

const App = () => {
	const [authenticatedUser, setAuthenticatedUser] = useState(null);
	let location = useLocation();

	useEffect(() => {
		const handleUserAuthStatus = async () => {
			getAuthenticatedUser().then((user) => {
				setAuthenticatedUser(user);
				//temp solution as we need to make redirection to login page if trying to access page that needs auth.
				localStorage.setItem('user', user);
			});
		};
		handleUserAuthStatus();
	}, [location]);

	const commonRoutes = (
		<>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signup' element={<SignupPage />} />
		</>
	);

	const protectedRoutes = <Route path='/home' element={<h1>HOME</h1>} />;

	return (
		<>
			{authenticatedUser ? <HeaderAfterLogin /> : <Header />}
			{/** NOTE: There must be only 1 Route element. Route seperation must happen only within this one. */}
			<Routes>
				{commonRoutes}
				<Route element={<ProtectedRoute />}>{protectedRoutes}</Route>
				<Route path='*' element={<h1>404 Page Not Found.</h1>} />
			</Routes>
		</>
	);
};

export default App;
