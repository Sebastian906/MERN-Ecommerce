import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            {/** Barra lateral de administrador */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                {/** Cabecera de administrador */}
                <AdminHeader className="bg-pink-100" setOpen={setOpenSidebar} />
                <main className="flex flex-col p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;