import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { agregarNuevoProducto, borrarProducto, editarProducto, listarTodosLosProductos } from "@/store/admin/products-slice";
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
        currentEditedId !== null ?
            ejecucion(editarProducto({
                id: currentEditedId, formData
            })).then((data) => {
                console.log(data, "editar");
                if (data?.payload?.success) {
                    ejecucion(listarTodosLosProductos());
                    setFormData(initialFormData)
                    setOpenCreateProductsDialog(false)
                    setCurrentEditedId(null)
                }
            }) :
            ejecucion(agregarNuevoProducto({
                ...formData,
                imagen: uploadedImageUrl
            })).then((data) => {
                if (data?.payload?.success) {
                    ejecucion(listarTodosLosProductos());
                    setOpenCreateProductsDialog(false)
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast.success("Producto agregado correctamente.")
                }
            });
    }

    function handleDelete(getCurrentProductId) {
        ejecucion(borrarProducto(getCurrentProductId)).then(data=> {
            if (data?.payload?.success) {
                ejecucion(listarTodosLosProductos());
            }
        })
    }

    function isFormValid() {
        return Object.keys(formData)
            .map(key => formData[key] !== '')
            .every(item => item);
    }

    useEffect(() => {
        ejecucion(listarTodosLosProductos())
    }, [ejecucion])

    console.log(formData, "productList");

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
                            <AdminProductTile
                                key={productItem._id}
                                setFormData={setFormData}
                                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                                setCurrentEditedId={setCurrentEditedId}
                                producto={productItem}
                                handleDelete={handleDelete}
                            />
                        ))
                        : null
                }
            </div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => {
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }}
            >
                <SheetContent side="right" className="overflow-auto px-6 [&>button]:text-white [&>button]:hover:text-gray-300 [&_.select-trigger]:!bg-white [&_.select-trigger]:!border-gray-300">
                    <SheetHeader className="px-0 pb-6">
                        <SheetTitle className="text-left">
                            {
                                currentEditedId !== null ?
                                    'Editar Producto' : 'Agregar Nuevo Producto'
                            }
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
                            buttonText={currentEditedId !== null ? 'Editar' : 'Agregar'}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;