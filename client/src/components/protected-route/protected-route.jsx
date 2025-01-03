import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (props) => {
    // let auth={'token': false}
    return (
        props.isAuthenticated ? 
        <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoute;