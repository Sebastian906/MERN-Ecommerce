import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { agregarNuevoProducto, listarTodosLosProductos } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const { productList } = useSelector(state => state.adminProductos)
    const ejecucion = useDispatch();

    function onSubmit(event) {
        event.preventDefault();
        ejecucion(agregarNuevoProducto({
            ...formData,
            imagen: uploadedImageUrl
        })).then((data) => {
            if (data?.payload?.success) {
                ejecucion(listarTodosLosProductos())
                setOpenCreateProductsDialog(false)
                setImageFile(null);
                setFormData(initialFormData);
                toast.success("Producto agregado correctamente.")
            }
        });
    }

    useEffect(() => {
        ejecucion(listarTodosLosProductos())
    }, [ejecucion])

    console.log(productList, uploadedImageUrl, "productList");

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Agregar Nuevo Producto
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ?
                        productList.map(productItem => (
                            <AdminProductTile setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} producto={productItem} />
                        )) 
                    : null
                }
            </div>
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
                        isEditMode={currentEditedId !== null}
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