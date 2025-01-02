import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected-route/protected-route';

const App = () => {
	return (
		<>
			<Routes>
				{commonRoutes}
				<Route element={<ProtectedRoute />}>
					<Route path='/home' element={<h1>HOME</h1>} />
				</Route>
				<Route path='*' element={<h1>404 Page Not Found.</h1>} />
			</Routes>
		</>
	);
};

export default App;
