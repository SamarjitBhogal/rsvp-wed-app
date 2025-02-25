import { Navigate, Outlet } from 'react-router-dom';
import LoaderFull from '../loader/loader-full';

const ProtectedRoute = ({ isAuthenticated }) => {
	if (isAuthenticated === null) {
		return <LoaderFull />;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
