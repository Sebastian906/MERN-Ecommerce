import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { agregarNuevaCuenta, editarCuenta, eliminarCuenta, listarTodosLasCuentas } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
    cuenta: '',
    ciudad: '',
    telefono: '',
    codigopin: '',
    notas: ''
}

function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const ejecucion = useDispatch();
    const { usuario } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.cuentaProductos)

    function handleManageAddress(event) {
        event.preventDefault();

        if (addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData)
            toast.error("Se pueden añadir hasta 3 cuentas");
            return;
        }

        currentEditedId !== null ?
            ejecucion(
                editarCuenta({
                    usuarioId: usuario?.id,
                    cuentaId: currentEditedId,
                    formData
                })).then((data) => {
                    if (data?.payload?.success) {
                        ejecucion(listarTodosLasCuentas(usuario?.id));
                        setCurrentEditedId(null);
                        setFormData(initialAddressFormData)
                        toast.info("Datos de dirección actualizados.")
                    }
                }) :
            ejecucion(agregarNuevaCuenta({
                ...formData,
                usuarioId: usuario?.id
            })).then(data => {
                if (data?.payload?.success) {
                    ejecucion(listarTodosLasCuentas(usuario?.id));
                    setFormData(initialAddressFormData);
                    toast.success("Datos de dirección actualizados.")
                }
            });
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            cuenta: getCurrentAddress?.cuenta,
            ciudad: getCurrentAddress?.ciudad,
            telefono: getCurrentAddress?.telefono,
            codigopin: getCurrentAddress?.codigopin,
            notas: getCurrentAddress?.notas
        })
    }

    function handleDeleteAddress(getCurrentAddress) {
        console.log(getCurrentAddress);
        ejecucion(eliminarCuenta({ usuarioId: usuario?.id, cuentaId: getCurrentAddress._id })).then(data => {
            if (data?.payload?.success) {
                ejecucion(listarTodosLasCuentas(usuario?.id))
                toast.warning("Los datos de la cuenta han sido borrados.")
            }
        })
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
                    addressList && addressList.length > 0
                        ? addressList.map(singleAddressItem => (
                            <AddressCard
                                handleDeleteAddress={handleDeleteAddress}
                                key={singleAddressItem._id}
                                addressInfo={singleAddressItem}
                                handleEditAddress={handleEditAddress}
                            />
                        )) : null
                }
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {
                            currentEditedId !== null ? 'Editar Cuenta' : 'Agregar Nueva Cuenta'
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <CommonForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={currentEditedId !== null ? 'Editar' : 'Agregar'}
                        onSubmit={handleManageAddress}
                        isBtnDisabled={!isFormValid()}
                    />
                </CardContent>
            </Card>
        </>
    );
}

export default Address;