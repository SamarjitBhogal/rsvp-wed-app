import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/login/login';

const App = () => {
	const router = createBrowserRouter([{ path: '/login', element: <LoginPage /> }]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
