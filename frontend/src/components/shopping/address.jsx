import { useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";

const initialAddressFormData = {
    cuenta: '',
    ciudad: '',
    telefono: '',
    codigopin: '',
    notas: ''
}

function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)

    function handleManageAddress(event) {
        event.preventDefault()
    }

    return ( 
        <Card>
            <div>
                Lista de Cuentas
            </div>
            <CardHeader>
                <CardTitle>
                    Agregar Nueva Cuenta
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={'Agregar'}
                    onSubmit={handleManageAddress}
                />
            </CardContent>
        </Card>
    );
}

export default Address;