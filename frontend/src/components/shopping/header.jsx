import { LuChartPie, LuMenu, LuStore } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "@radix-ui/react-label";

function MenuItems() {
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row text-black">
            {
                shoppingViewHeaderMenuItems.map((menuItem) => (
                    <Label
                        className="text-sm font-medium cursor-pointer text-black"
                        key={menuItem.id}
                        to={menuItem.path}
                    >
                        {menuItem.label}
                    </Label>
                ))}
        </nav>
    )
}

function ShoppingHeader() {

    const { estaAutenticado } = useSelector(state => state.auth);


    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to='/tienda/inicio' className="flex items-center gap-2">
                    <LuStore className="h-6 w-6 text-black" />
                    <span className="font-bold text-2xl text-black">OutfitOn</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <LuMenu className="h-6 w-6 bg-slate-900 hover:bg-slate-700 text-white" />
                            <span className="sr-only">Menú alterno</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                {
                    estaAutenticado ? <div></div> : null
                }
            </div>
        </header>
    );
}

export default ShoppingHeader;