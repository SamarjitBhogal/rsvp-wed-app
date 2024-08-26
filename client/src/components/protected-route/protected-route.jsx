import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const user = localStorage.getItem('authenticated');
	if (!user) {
		return <Navigate to='/login' />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
