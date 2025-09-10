import { Navigate, Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin/layout"
import AdminDashboard from "./pages/admin/dashboard"
import AdminProducts from "./pages/admin/products"
import AdminOrders from "./pages/admin/orders"
import AdminFeatures from "./pages/admin/features"
import ShoppingLayout from "./components/shopping/layout"
import NotFound from "./pages/not-found"
import ShoppingAccount from "./pages/shopping/account"
import ShoppingCheckout from "./pages/shopping/checkout"
import ShoppingHome from "./pages/shopping/home"
import ShoppingListing from "./pages/shopping/listing"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { verificarAutenticacion } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"

function App() {

  const { usuario, estaAutenticado, estaCargando } = useSelector(state => state.auth)
  const ejecucion = useDispatch();

  useEffect(() => {
    ejecucion(verificarAutenticacion());
  },[ejecucion]);

  if (estaCargando) return <Skeleton className="w-[800] bg-black h-[600px]"/>

  console.log(estaCargando, usuario);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Redirección automática de la raíz a /autorizacion/iniciar-sesion */}
        <Route path="/" element={<Navigate to="/autorizacion/iniciar-sesion" replace />} />
        <Route path="/autorizacion" element={
          <CheckAuth estaAutenticado={estaAutenticado} usuario={usuario}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="iniciar-sesion" element={<AuthLogin />} />
          <Route path="registro" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth estaAutenticado={estaAutenticado} usuario={usuario}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="panel" element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="ordenes" element={<AdminOrders />} />
          <Route path="caracteristicas" element={<AdminFeatures />} />
        </Route>

        <Route path="/tienda" element={
          <CheckAuth estaAutenticado={estaAutenticado} usuario={usuario}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="cuenta" element={<ShoppingAccount />} />
          <Route path="caja" element={<ShoppingCheckout />} />
          <Route path="inicio" element={<ShoppingHome />} />
          <Route path="lista" element={<ShoppingListing />} />
        </Route>
        <Route path="/sin-autorizar" element={<UnauthPage />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
