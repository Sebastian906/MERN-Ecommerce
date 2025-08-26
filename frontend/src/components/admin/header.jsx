import { Button } from "../ui/button";
import { LuAlignJustify, LuLogOut } from "react-icons/lu";

function AdminHeader() {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button className='lg:hidden sm:block'>
                <LuAlignJustify />
                <span className="sr-only">Menú alterno</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow hover:!bg-slate-700">
                    <LuLogOut />
                    Cerrar Sesión
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader