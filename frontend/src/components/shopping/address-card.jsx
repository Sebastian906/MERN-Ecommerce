import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ 
    addressInfo, 
    handleDeleteAddress, 
    handleEditAddress 
}) {

    return ( 
        <Card>
            <CardContent className="flex flex-col p-4 gap-2 min-w-[250px] max-w-[350px] bg-transparent">
                <Label className="mb-1"><span className="font-semibold">Cuenta:</span> {addressInfo?.cuenta}</Label>
                <Label className="mb-1"><span className="font-semibold">Ciudad:</span> {addressInfo?.ciudad}</Label>
                <Label className="mb-1"><span className="font-semibold">Código Pin:</span> {addressInfo?.codigopin}</Label>
                <Label className="mb-1"><span className="font-semibold">Teléfono:</span> {addressInfo?.telefono}</Label>
                <Label><span className="font-semibold">Notas:</span> {addressInfo?.notas}</Label>
            </CardContent>
            <CardFooter className="p-3 flex justify-between">
                <Button onClick={() => handleEditAddress(addressInfo)} className="!bg-purple-500 hover:!bg-purple-600 !text-neutral-100">Editar</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo)} className="!bg-pink-500 hover:!bg-pink-600 !text-neutral-100">Eliminar</Button>
            </CardFooter>
        </Card>
    );
}

export default AddressCard;