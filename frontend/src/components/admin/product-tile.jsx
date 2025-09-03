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
            <CardContent className="p-3">
                <h2 className="text-lg font-bold mb-1">
                    {producto?.titulo}
                </h2>
                <div className="flex justify-between items-center mb-1">
                    <span className={`${producto?.precioVenta > 0 ? 'line-through' : ''} text-base font-semibold text-primary`}>
                        ${producto?.precio}
                    </span>
                    <span className="text-base font-bold">
                        ${producto?.precioVenta}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-3 items-center px-3 pb-3 pt-0">
                <Button>Editar</Button>
                <Button>Borrar</Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;