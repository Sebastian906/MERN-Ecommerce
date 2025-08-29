import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LuCloudUpload } from "react-icons/lu";

function ProductImageUpload({
    imageFile, 
    setImageFile, 
    // uploadedImageUrl, 
    // setUploadedImageUrl,
}) {

    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
    }

    return ( 
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">
                Subir Imagen
            </Label>
            <div>
                <Input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    ref={inputRef} 
                    onChange={handleImageFileChange}
                />
                {
                    !imageFile ? 
                    <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                        <LuCloudUpload className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>
                            Arrastre y suelte o haga Click para subir la imagen
                        </span>
                    </Label> : <div></div>
                }
            </div>
        </div>
    );
}

export default ProductImageUpload;