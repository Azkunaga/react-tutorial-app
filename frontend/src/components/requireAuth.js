import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ( allowedRole ) => {
    const user = localStorage.getItem('userData');
    const location = useLocation();

    return (
            user?.role?.find(role => allowedRole===role)
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;