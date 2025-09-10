import ProductFilter from "@/components/shopping/filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { LuArrowUpDown } from "react-icons/lu";

function ShoppingListing() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">Todos los Productos</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">10 Productos</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1 !bg-white hover:!bg-gray-100">
                                    <LuArrowUpDown className="h-4 w-4" />
                                    <span>Ordenar por:</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup>
                                    {
                                        sortOptions.map(sortItem =>
                                            <DropdownMenuRadioItem
                                                key={sortItem.id}
                                            >
                                                {sortItem.label}
                                            </DropdownMenuRadioItem>
                                        )
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingListing;