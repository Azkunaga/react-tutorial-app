import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ( params ) => {
    const user = JSON.parse(localStorage.getItem('userData'));
    const location = useLocation();

    return (
            user?.role===params.allowedRoles
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;