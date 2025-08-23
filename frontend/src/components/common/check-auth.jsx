import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ estaAutenticado, usuario, children }) {

    const location = useLocation();

    if (
        !estaAutenticado && 
        !(
            location.pathname.includes('/iniciar-sesion') ||
            location.pathname.includes('/registro')
        )
    ) {
        return <Navigate to='/autorizacion/iniciar-sesion'/>;
    }

    if (
        estaAutenticado && 
        (
            location.pathname.includes('/iniciar-sesion') ||
            location.pathname.includes('/registro')
        )
    ) {
        if (usuario?.role === 'admin') {
            return <Navigate to="/admin/panel"/>
        } else {
            return <Navigate to="/tienda/inicio"/>
        }
    }

    if (
        estaAutenticado &&
        usuario?.role !== 'admin' &&
        location.pathname.includes('admin')
    ) {
        return <Navigate to='/no-autorizado/'/> 
    }

    if (
        estaAutenticado &&
        usuario?.role === 'admin' &&
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