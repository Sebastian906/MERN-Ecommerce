import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LuStar } from "react-icons/lu";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.imagen}
                        alt={productDetails?.titulo}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div>
                    <div>
                        <h1 className="text-3xl font-extrabold">
                            {productDetails?.titulo}
                        </h1>
                        <p className="text-muted-foreground text-xl mb-5 mt-4">
                            {productDetails?.descripcion}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-xl font-bold text-primary mb-5 mt-4 ${productDetails?.precioVenta > 0 ? 'line-through' : ''}`}>
                            ${productDetails?.precio}
                        </p>
                        {
                            productDetails?.precioVenta > 0 ?
                                <p className="text-xl font-bold text-muted-foreground mb-5 mt-4">
                                    ${productDetails?.precioVenta}
                                </p> : null
                        }
                    </div>
                    <div className="mt-5 mb-5">
                        <Button className="w-full">Agregar al Carrito</Button>
                    </div>
                    <Separator/>
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reseñas</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 bg-gray-500">
                                    <AvatarFallback>
                                        SS
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Sebastián Salazar</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <LuStar className="w-5 h-5 fill-amber-300"/>
                                        <LuStar className="w-5 h-5 fill-amber-300"/>
                                        <LuStar className="w-5 h-5 fill-amber-300"/>
                                        <LuStar className="w-5 h-5 fill-amber-300"/>
                                        <LuStar className="w-5 h-5 fill-amber-300"/>
                                    </div>
                                    <p className="text-muted-foreground">Producto de alta calidad</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;