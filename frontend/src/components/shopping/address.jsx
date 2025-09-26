import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { agregarNuevaCuenta, listarTodosLasCuentas } from "@/store/shop/address-slice";
import AddressCard from "./address-card";

const initialAddressFormData = {
    cuenta: '',
    ciudad: '',
    telefono: '',
    codigopin: '',
    notas: ''
}

function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    const ejecucion = useDispatch();
    const { usuario } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.cuentaProductos)

    function handleManageAddress(event) {
        event.preventDefault();
        ejecucion(agregarNuevaCuenta({
            ...formData,
            usuarioId: usuario?.id
        })).then(data => {
            if (data?.payload?.success) {
                ejecucion(listarTodosLasCuentas(usuario?.id));
                setFormData(initialAddressFormData);
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    useEffect(() => {
        ejecucion(listarTodosLasCuentas(usuario?.id))
    }, [ejecucion])

    console.log(addressList, 'addressList');

    return (
        <>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    addressList && addressList.length > 0 ?
                        addressList.map(singleAddressItem => <AddressCard key={singleAddressItem._id} addressInfo={singleAddressItem} />) : null
                }
            </div>
            <Card>
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
                        isBtnDisabled={!isFormValid()}
                    />
                </CardContent>
            </Card>
        </>
    );
}

export default Address;