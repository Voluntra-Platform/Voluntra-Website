import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading user session...</div>; 
    }

    // Check if user is logged in
    if (!user) {
        // If not logged in, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If the user has the required role
    const userRole = user.role;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // If logged in but unauthorized, redirecting to the welcome page
        return <Navigate to="/home" replace />; 
    }

    // If logged in and authorized, render the child component (the Dashboard)
    return <Outlet />;
};

export default ProtectedRoute;