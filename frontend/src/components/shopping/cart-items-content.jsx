import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";
import { Button } from "../ui/button";

function UserCartItemsContent({ cartItem }) {
    return (
        <div className="flex items-center space-x-4">
            <img
                src={cartItem?.imagen}
                alt={cartItem?.titulo}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.titulo}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 !bg-transparent"
                    >
                        <LuMinus className="w-4 h-4 text-black hover:!bg-pink-200" />
                        <span className="sr-only">Quitar</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.cantidad}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 !bg-transparent"
                    >
                        <LuPlus className="w-4 h-4 text-black hover:!bg-pink-200" />
                        <span className="sr-only">Añadir</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ${((cartItem?.precioVenta > 0 ? cartItem?.precioVenta : cartItem?.precio) * cartItem?.cantidad).toFixed(2)}
                </p>
                <LuTrash2 className="cursor-pointer mt-1" size={20}/>
            </div>
        </div>
    );
}

export default UserCartItemsContent;