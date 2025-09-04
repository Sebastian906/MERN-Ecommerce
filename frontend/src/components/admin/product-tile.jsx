import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ producto }) {
    return (
        <Card className="w-full max-w-sm mx-auto py-0 overflow-hidden">
            <div className="relative">
                <img
                    src={producto?.imagen}
                    alt={producto?.titulo}
                    className="w-full h-[300px] object-cover"
                />
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
                <Button size="sm" className="!bg-teal-600 hover:!bg-teal-700 !text-neutral-100 !px-5">Editar</Button>
                <Button size="sm" className="!bg-rose-600 hover:!bg-rose-700 !text-neutral-100 !px-5">Borrar</Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;