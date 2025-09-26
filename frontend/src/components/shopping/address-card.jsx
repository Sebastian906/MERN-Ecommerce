import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressInfo }) {
    return ( 
        <Card>
            <CardContent className="flex flex-col p-4 gap-2 min-w-[250px] max-w-[350px] bg-transparent">
                <Label className="mb-1"><span className="font-semibold">Address:</span> {addressInfo?.cuenta}</Label>
                <Label className="mb-1"><span className="font-semibold">City:</span> {addressInfo?.ciudad}</Label>
                <Label className="mb-1"><span className="font-semibold">Pincode:</span> {addressInfo?.codigopin}</Label>
                <Label className="mb-1"><span className="font-semibold">Phone:</span> {addressInfo?.telefono}</Label>
                <Label><span className="font-semibold">Notes:</span> {addressInfo?.notas}</Label>
            </CardContent>
        </Card>
    );
}

export default AddressCard;