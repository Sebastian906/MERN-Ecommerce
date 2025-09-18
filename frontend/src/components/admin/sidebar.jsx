import { Fragment } from "react";
import { LuBadgeCheck, LuChartNoAxesCombined, LuLayoutDashboard, LuShoppingBasket } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
    {
        id: 'panel',
        label: 'Panel',
        path: '/admin/panel',
        icon: <LuLayoutDashboard size={22} />
    },
    {
        id: 'productos',
        label: 'Productos',
        path: '/admin/productos',
        icon: <LuShoppingBasket size={22} />
    },
    {
        id: 'ordenes',
        label: 'Ordenes',
        path: '/admin/ordenes',
        icon: <LuBadgeCheck size={22} />
    }
]

function MenuItems({ setOpen }) {

    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen ? setOpen(false) : null;
                    }}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-fuchsia-100 hover:text-foreground cursor-pointer transition-colors"
                >
                    {menuItem.icon}
                    <span className="text-base font-medium">{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSidebar({ open, setOpen }) {

    const navigate = useNavigate();

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-72 [&>button]:text-white [&>button]:hover:text-gray-300 bg-pink-100">
                    <div className="flex flex-col h-full bg-pink-100">
                        <SheetHeader className="border-b pb-4">
                            <SheetTitle className="flex items-center gap-2 text-xl font-extrabold pr-10">
                                <LuChartNoAxesCombined size={22} />
                                <span>Panel de Admin</span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
                <div
                    onClick={() => navigate('/admin/panel')}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <LuChartNoAxesCombined size={22} />
                    <h2 className="text-xl font-extrabold">
                        Panel de Admin
                    </h2>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

export default AdminSidebar