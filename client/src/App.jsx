import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SignupPage from './pages/signup/signup';
import LoginPage from './pages/login/login';

const App = () => {
	const router = createBrowserRouter([
		{ path: '/', element: <h1>LANDING PAGE</h1> },
		{ path: '/signup', element: <SignupPage /> },
		{ path: '/login', element: <LoginPage /> },
		{ path: '/home', element: <h1>HOME</h1> },
	]);

	return (
		//TODO: Authenticated routes and non-authenticated routes.
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
