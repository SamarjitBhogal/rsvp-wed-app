import { Navigate, Outlet } from 'react-router-dom';
import LoaderFull from '../loader/loader-full';
import Header from '../header/header';

const ProtectedRoute = ({ isAuthenticated }) => {
	if (isAuthenticated === null) {
		return <LoaderFull />;
	}

	return isAuthenticated ? (
		<>
			<Header />
			<Outlet />
		</>
	) : (
		<Navigate to='/' />
	);
};

export default ProtectedRoute;
