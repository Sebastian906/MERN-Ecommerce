import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function UserCartWrapper() {
    return (
        <SheetContent className="sm:max-w-md px-4">
            <SheetHeader>
                <SheetTitle>
                    Su Carrito
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">

            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">$1000</span>
                </div>
            </div>
            <Button className="w-full mt-6">Verificar</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;