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

function App() {

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/** Traer Componentes al archivo principal */}
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
      </Routes>
    </div>
  )
}

export default App
