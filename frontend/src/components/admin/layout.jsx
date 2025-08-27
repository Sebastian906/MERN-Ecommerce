import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
    return (
        <div className="flex min-h-screen w-full">
            {/** Barra lateral de administrador */}
            <AdminSidebar/>
            <div className="flex flex-1 flex-col">
                {/** Cabecera de administrador */}
                <AdminHeader/>
                <main className="flex-1 bg-fuchsia-100 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div> 
    );
}

export default AdminLayout;