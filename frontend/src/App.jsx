import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"

function App() {

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/** Traer Componentes al archivo principal */}
      <Routes>
        <Route path="/autorizacion" element={<AuthLayout/>}>
          <Route path="iniciar-sesion" element={<AuthLogin/>}/>
          <Route path="registro" element={<AuthRegister/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
