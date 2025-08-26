import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ estaAutenticado, usuario, children }) {

    const location = useLocation();

    console.log(location.pathname, estaAutenticado);

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
        if (usuario?.rol === 'admin') {
            return <Navigate to="/admin/panel"/>
        } else {
            return <Navigate to="/tienda/inicio"/>
        }
    }

    if (
        estaAutenticado &&
        usuario?.rol !== 'admin' &&
        location.pathname.includes('admin')
    ) {
        return <Navigate to='/sin-autorizar/'/> 
    }

    if (
        estaAutenticado &&
        usuario?.rol === 'admin' &&
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