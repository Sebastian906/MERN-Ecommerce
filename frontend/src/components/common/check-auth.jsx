import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation();

    if (
        !isAuthenticated && 
        !(
            location.pathname.includes('/iniciar-sesion') ||
            location.pathname.includes('/registro')
        )
    ) {
        return <Navigate to='/autorizacion/iniciar-sesion'/>;
    }

    if (
        isAuthenticated && 
        (
            location.pathname.includes('/iniciar-sesion') ||
            location.pathname.includes('/registro')
        )
    ) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/panel"/>
        } else {
            return <Navigate to="/tienda/inicio"/>
        }
    }

    if (
        isAuthenticated &&
        user?.role !== 'admin' &&
        location.pathname.includes('admin')
    ) {
        return <Navigate to='/no-autorizado/'/> 
    }

    if (
        isAuthenticated &&
        user?.role === 'admin' &&
        location.pathname.includes('tienda')
    ) {
        return <Navigate to="/admin/panel"/>
    }

    return <>
        {
            children
        }
    </>
}

export default CheckAuth;