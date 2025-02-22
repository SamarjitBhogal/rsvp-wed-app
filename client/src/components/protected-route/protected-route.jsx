import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../loader/loader';

const ProtectedRoute = ({ isAuthenticated }) => {
	console.log(isAuthenticated);

	if (isAuthenticated === null) {
		return <Loader />;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
