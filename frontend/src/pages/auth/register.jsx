import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registrarUsuario } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"

const initialState = {
    usuario : '',
    correo : '',
    contraseña : '',
}

function AuthRegister() {

    const [formData, setFormData] = useState(initialState)
    const ejecucion = useDispatch();
    const navegar = useNavigate();
    //const toast = useSonner();

    function onSubmit(event) {
        event.preventDefault();
        ejecucion(registrarUsuario(formData)).then((data)=> {
            if(data?.payload?.success) {
                toast.success("Registro exitoso")
                navegar('/autorizacion/iniciar-sesion')
            } else {
                toast.error("Este correo ya está registrado. Por favor ingrese otro correo.")
            }
        })
    }

    console.log(formData);
    

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Crear nueva cuenta
                </h1>
                <p className="mt-2">
                    Ya existe su cuenta?
                    <Link 
                        className="font-medium ml-2 text-primary hover:underline" 
                        to='/autorizacion/iniciar-sesion'
                    >
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Registrarse'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;