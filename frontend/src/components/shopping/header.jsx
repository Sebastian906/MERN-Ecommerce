import { LuLogOut, LuMenu, LuShoppingCart, LuStore, LuUserCog } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { filterOptions } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUsuario } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { listarProductosDelCarrito } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {

    const navigate = useNavigate();

    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem('filters');
        if (getCurrentMenuItem.id === 'productos') {
            navigate('/tienda/lista');
            return;
        }
        const categoriaIds = filterOptions.Categoria.map(cat => cat.id);
        if (categoriaIds.includes(getCurrentMenuItem.id)) {
            const currentFilter = {
                categoria: [getCurrentMenuItem.id]
            };
            sessionStorage.setItem('filters', JSON.stringify(currentFilter));
            navigate(`/tienda/lista?categoria=${getCurrentMenuItem.id}`);
            return;
        }
        sessionStorage.setItem('filters', JSON.stringify({}));
        navigate(getCurrentMenuItem.path);
    }

    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-1 lg:gap-6 lg:flex-row text-slate-900 px-8 pt-8 pb-8">
            {
                shoppingViewHeaderMenuItems.map((menuItem) => (
                    <Label
                        onClick={() => handleNavigate(menuItem)}
                        className="text-sm font-medium cursor-pointer !text-slate-900 py-3 px-2 rounded-md hover:bg-pink-200 hover:!text-black w-full lg:w-auto transition-colors"
                        key={menuItem.id}
                    >
                        {menuItem.label}
                    </Label>
                ))}
        </nav>
    )
}

function HeaderRightContent() {
    const { usuario } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.carritoProductos)
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const ejecucion = useDispatch();

    function handleLogout() {
        ejecucion(logoutUsuario())
    }

    useEffect(() => {
        if (usuario?.id) {
            ejecucion(listarProductosDelCarrito(usuario.id));
        }
    }, [ejecucion, usuario?.id]);

    console.log(cartItems, "dummy");
    

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button
                    onClick={() => setOpenCartSheet(true)}
                    variant="outline"
                    size="icon"
                    className="relative !text-black !bg-transparent hover:!bg-pink-200"
                >
                    <LuShoppingCart className="h-6 w-6 !text-black" />
                    <span className="sr-only">Carrito de compra</span>
                </Button>
                <UserCartWrapper cartItems={
                    cartItems && cartItems.length > 0
                    ? cartItems
                    : []
                } />
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-gray-900">
                        <AvatarFallback className="bg-gray-900 text-white font-bold">
                            {usuario?.usuario[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Sesión Iniciada como {usuario?.usuario}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/tienda/cuenta')}>
                        <LuUserCog className="mr-2 h-4 w-4" />
                        Cuenta
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LuLogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function ShoppingHeader() {

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-pink-100">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to='/tienda/inicio' className="flex items-center gap-2">
                    <LuStore className="h-6 w-6 text-black" />
                    <span className="font-bold text-2xl text-black">OutfitOn</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden !bg-pink-100 hover:!bg-pink-200">
                            <LuMenu className="h-6 w-6 !text-slate-900" />
                            <span className="sr-only">Menú alterno</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs [&>button[data-state=closed]]:bg-white [&>button[data-state=closed]]:text-white [&>button[data-state=closed]>svg]:text-white">
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;