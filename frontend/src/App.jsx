import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin/layout"
import AdminHeader from "./components/admin/header"
import AdminSidebar from "./components/admin/sidebar"
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

function App() {

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/autorizacion" element={<AuthLayout/>}>
          <Route path="iniciar-sesion" element={<AuthLogin/>}/>
          <Route path="registro" element={<AuthRegister/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="panel" element={<AdminDashboard/>}/>
          <Route path="productos" element={<AdminProducts/>}/>
          <Route path="ordenes" element={<AdminOrders/>}/>
          <Route path="caracteristicas" element={<AdminFeatures/>}/>
        </Route>
        <Route path="/tienda" element={<ShoppingLayout/>}>
          <Route path="cuenta" element={<ShoppingAccount/>}/>
          <Route path="caja" element={<ShoppingCheckout/>}/>
          <Route path="inicio" element={<ShoppingHome/>}/>
          <Route path="lista" element={<ShoppingListing/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
