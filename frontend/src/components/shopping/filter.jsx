import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
    // const [selected, setSelected] = useState({});

    // const handleChange = (group, id, value) => {
    //     setSelected((prev) => ({
    //         ...prev,
    //         [group]: {
    //             ...prev[group],
    //             [id]: value
    //         }
    //     }));
    // };

    return (
        <div className="rounded-lg shadow-sm bg-pink-100">
            <div className="p-4 border-b bg-red-100">
                <h2 className="text-lg font-extrabold">Filtros</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((option) => (
                                    <Label key={option.id} className="flex font-medium items-center gap-2">
                                        <Checkbox
                                            checked={
                                                filters && 
                                                Object.keys(filters).length > 0 && 
                                                filters[keyItem] && 
                                                filters[keyItem].indexOf(option.id) > -1
                                            }
                                            className="w-5 h-5 !bg-white !border-gray-400"
                                            // checked={!!selected[keyItem]?.[option.id]}
                                            onCheckedChange={()=>handleFilter(keyItem, option.id)}
                                        />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;