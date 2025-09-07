import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ producto, setFormData, setOpenCreateProductsDialog, setCurrentEditedId, handleDelete }) {
    return (
        <Card className="w-full max-w-sm mx-auto py-0 overflow-hidden">
            <div className="relative">
                {producto?.imagen ? (
                    <img
                        src={producto.imagen}
                        alt={producto?.titulo || 'Producto'}
                        className="w-full h-[300px] object-cover"
                    />
                ) : (
                    <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                            <div className="text-gray-400 text-4xl mb-2 font-bold">IMG</div>
                            <span className="text-gray-500 text-sm">Sin imagen</span>
                        </div>
                    </div>
                )}
            </div>
            <CardContent className="px-6 pt-0.5 pb-1">
                <h2 className="text-lg font-bold mb-2">
                    {producto?.titulo}
                </h2>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${producto?.precioVenta > 0 ? 'line-through' : ''} text-base font-semibold text-primary`}>
                        ${producto?.precio}
                    </span>
                    {
                        producto?.precioVenta > 0 ? (
                            <span className="text-base font-bold">
                                ${producto?.precioVenta}
                            </span>
                        ) : null
                    }
                </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-8 items-center px-1 pb-5 pt-0.5">
                <Button onClick={() => {
                    setOpenCreateProductsDialog(true);
                    setCurrentEditedId(producto?._id);
                    setFormData(producto);
                }} size="sm" className="!bg-purple-500 hover:!bg-purple-600 !text-neutral-100 !px-5">Editar</Button>
                <Button 
                    onClick={()=>handleDelete(producto?._id)}
                    size="sm" 
                    className="!bg-pink-500 hover:!bg-pink-600 !text-neutral-100 !px-5"
                >
                    Borrar
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;