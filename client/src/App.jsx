import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/header/header';
import LandingPage from './pages/landing/landing-page';
import SignupPage from './pages/signup/signup';
import LoginPage from './pages/login/login';

const App = () => {
	const router = createBrowserRouter([
		{ path: '/', element: <LandingPage /> },
		{ path: '/signup', element: <SignupPage /> },
		{ path: '/login', element: <LoginPage /> },
		{ path: '/home', element: <h1>HOME</h1> },
	]);

	return (
		//TODO: Authenticated routes and non-authenticated routes.
		<>
			<Header />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
