import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { LuBaby, LuChevronLeft, LuChevronRight, LuFlower, LuFootprints, LuShirt, LuWatch } from 'react-icons/lu';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listarProductosFiltrados } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping/product-tile';
import { SiAdidas, SiHandm, SiNike, SiPuma, SiZara } from "react-icons/si";
import { PiPants } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const categoriasConIcono = [
    { id: "hombre", label: "Hombre", icon: LuShirt },
    { id: "mujer", label: "Mujer", icon: LuFlower },
    { id: "niños", label: "Niños", icon: LuBaby },
    { id: "accesorios", label: "Accesorios", icon: LuWatch },
    { id: "calzado", label: "Calzado", icon: LuFootprints },
];

const marcasConIcono = [
    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "levi", label: "Levi's", icon: PiPants },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "h&m", label: "H&M", icon: SiHandm },
];

function ShoppingHome() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const { productList } = useSelector(state => state.tiendaProductos)
    const ejecucion = useDispatch();
    const navigate = useNavigate();
    const slides = [bannerOne, bannerTwo, bannerThree];

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/tienda/lista')
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
        }, 5000)
        return ()=> clearInterval(timer);
    }, []);

    useEffect(() => {
        ejecucion(listarProductosFiltrados({
            filterParams: {}, 
            sortParams: 'precio-menoramayor'
        }))
    }, [ejecucion]);

    console.log(productList, 'productList');
    

    return ( 
        <div className="flex flex-col min-h-screen bg-pink-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit exercitationem officia omnis error quaerat optio possimus accusantium quae accusamus libero saepe, sed hic asperiores assumenda aspernatur eum consectetur beatae architecto temporibus animi soluta eligendi enim mollitia. Minus rem laborum ex, quae dolore praesentium animi, consequatur odio sunt atque, ea dignissimos repudiandae perferendis perspiciatis error. Nobis perspiciatis reiciendis praesentium est ut.
            <div className="relative w-full h-[600px] overflow-hidden">
                {
                    slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => 
                        setCurrentSlide(
                            prevSlide => (prevSlide - 1 + slides.length) %  slides.length
                    )}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 !bg-white/80"
                >
                    <LuChevronLeft className='w-4 h-4'/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => 
                        setCurrentSlide(
                            prevSlide => (prevSlide + 1) %  slides.length
                    )}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 !bg-white/80"
                >
                    <LuChevronRight className='w-4 h-4'/>
                </Button>
            </div>
            <section className='py-12 bg-pink-100'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Comprar por Categoria
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            categoriasConIcono.map(categoryItem => 
                            <Card onClick={()=>handleNavigateToListingPage(categoryItem, 'categoria')} className="cursor-pointer hover:shadow-lg transition-shadow bg-pink-100 hover:bg-pink-200"> 
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span className='font-bold'>{categoryItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className='py-12 bg-pink-100'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Comprar por Marca
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {
                            marcasConIcono.map(marcaItem => <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-pink-100 hover:bg-pink-200"> 
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <marcaItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span className='font-bold'>{marcaItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>
                        Productos Destacados
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            productList && productList.length > 0 ?
                            productList.map(productItem => 
                                <ShoppingProductTile
                                    producto={productItem}
                                />
                            )
                            : null
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShoppingHome;