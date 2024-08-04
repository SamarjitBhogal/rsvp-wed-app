import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/login/login';

const App = () => {
	const router = createBrowserRouter([
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
