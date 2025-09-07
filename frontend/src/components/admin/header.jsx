import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { LuAlignJustify, LuLogOut } from "react-icons/lu";
import { logoutUsuario } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {

    const ejecucion = useDispatch()

    function handleLogout() {
        ejecucion(logoutUsuario())
    }

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button onClick={() => setOpen(true)} className='lg:hidden sm:block bg-slate-900 hover:bg-slate-700 text-white' variant="ghost">
                <LuAlignJustify />
                <span className="sr-only">Menú alterno</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button onClick={handleLogout} className="bg-slate-900 hover:bg-slate-700 text-white">
                    <LuLogOut />
                    Cerrar Sesión
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader