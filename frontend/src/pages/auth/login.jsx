import CommonForm from "@/components/common/form";
import { loginrFormControls } from "@/config";
import { loginUsuario } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
    usuario : '',
    correo : '',
    contraseña : '',
}

function AuthLogin() {

    const [formData, setFormData] = useState(initialState)
    const ejecucion = useDispatch();
    
    function onSubmit(event) {
        event.preventDefault();
        ejecucion(loginUsuario(formData)).then((data) => {
            if(data?.payload?.success) {
                toast.success("Se inicio la sesión correctamente.")
            } else {
                toast.error(data?.payload?.message || "Ha ocurrido un error")
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Iniciar Sesión
                </h1>
                <p className="mt-2">
                    No tiene una cuenta?
                    <Link 
                        className="font-medium ml-2 text-primary hover:underline" 
                        to='/autorizacion/registro'
                    >
                        Registrese
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={loginrFormControls}
                buttonText={'Iniciar Sesión'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;