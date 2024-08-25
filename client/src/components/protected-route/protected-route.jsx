import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
	if (!props.isAuthenticated) {
		return <Navigate to='/login' replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
