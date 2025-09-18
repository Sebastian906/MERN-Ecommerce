import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems }) {

    const totalCartAmount = cartItems && cartItems.length > 0 ?
        cartItems.reduce((sum, currentItem) => sum + (
            currentItem?.precioVenta > 0 ? currentItem?.precioVenta : currentItem?.precio
        ) * currentItem?.cantidad, 0)
        : 0;

    return (
        <SheetContent className="sm:max-w-md px-4 bg-pink-100">
            <SheetHeader>
                <SheetTitle>
                    Su Carrito
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {cartItems && cartItems.length > 0
                    ? cartItems.map(item => <UserCartItemsContent key={item.id} cartItem={item} />)
                    : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <Button className="w-full mt-6">Verificar</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;