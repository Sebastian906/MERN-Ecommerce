import ProductImageUpload from "@/components/admin/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const initialFormData = {
    imagen: null,
    titulo: '',
    descripcion: '',
    categoria: '',
    marca: '',
    precio: "",
    precioVenta: "",
    existenciaTotal: "",
}

function AdminProducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);

    function onSubmit() {

    }

    console.log(formData, "formData");

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Agregar Nuevo Producto
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => {
                setOpenCreateProductsDialog(false);
            }}
            >
                <SheetContent side="right" className="overflow-auto px-6 [&>button]:text-white [&>button]:hover:text-gray-300 [&_.select-trigger]:!bg-white [&_.select-trigger]:!border-gray-300">
                    <SheetHeader className="px-0 pb-6">
                        <SheetTitle className="text-left">
                            Agregar Nuevo Producto
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                        imageFile={imageFile} 
                        setImageFile={setImageFile} 
                        uploadedImageUrl={uploadedImageUrl} 
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText='Agregar'
                            formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;