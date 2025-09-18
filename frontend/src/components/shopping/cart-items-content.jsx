import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { actualizarCarrito, eliminarProductosDeCarrito } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {

    const { usuario } = useSelector(state => state.auth)

    const ejecucion = useDispatch();

    function handleUpdateQuantity(getCartItem, typeOfAction) {
        ejecucion(actualizarCarrito({
            usuarioId: usuario?.id, 
            productoId: getCartItem?.productoId, 
            cantidad: typeOfAction === "mas" ? 
                getCartItem?.cantidad + 1 : 
                getCartItem?.cantidad - 1
        })).then(data => {
            if (data?.payload?.success) {
                toast.info("Se actualiza contenido del carrito.")
            }
        });
    }

    function handleCartItemDelete(getCartItem) {
        ejecucion(eliminarProductosDeCarrito({ 
            usuarioId: usuario?.id, 
            productoId: getCartItem?.productoId
        })).then(data => {
            if (data?.payload?.success) {
                toast.warning("Producto eliminado del carrito.")
            }
        });
    }

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
                        disabled = {cartItem?.cantidad === 1}
                        onClick={() => handleUpdateQuantity(cartItem, 'menos')}
                    >
                        <LuMinus className="w-4 h-4 text-black hover:!bg-pink-200" />
                        <span className="sr-only">Quitar</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.cantidad}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 !bg-transparent"
                        onClick={() => handleUpdateQuantity(cartItem, 'mas')}
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
                <LuTrash2 onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20}/>
            </div>
        </div>
    );
}

export default UserCartItemsContent;