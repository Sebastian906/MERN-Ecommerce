import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ producto }) {
    return (
        <Card className="w-full max-w-sm mx-auto bg-pink-100">
            <div>
                <div className="relative">
                    <img
                        src={producto?.imagen}
                        alt={producto?.titulo}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {
                        producto?.precioVenta > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Descuento
                            </Badge>
                        ) : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                        {producto?.titulo}
                    </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[16px] text-muted-foreground">
                            {categoryOptionsMap[producto?.categoria]}
                        </span>
                        <span className="text-[16px] text-muted-foreground">
                            {brandOptionsMap[producto?.marca]}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${producto?.precioVenta > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                            ${producto?.precio}
                        </span>
                        {
                            producto?.precioVenta > 0 ? (
                                <span className="text-lg font-semibold text-primary">
                                    ${producto?.precioVenta}
                                </span>
                            ) : null
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Agregar al carrito</Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default ShoppingProductTile;