import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const user = localStorage.getItem('user');
	if (user == 'null') {
		return <Navigate to='/login' replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
