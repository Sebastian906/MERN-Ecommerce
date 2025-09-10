export const registerFormControls = [
    {
        name: "usuario",
        label: "Nombre de usuario",
        placeholder: "Ingrese su nombre de usuario",
        componentType: "input",
        type: "text",
    },
    {
        name: "correo",
        label: "Correo",
        placeholder: "Ingrese su correo",
        componentType: "input",
        type: "email",
    },
    {
        name: "contraseña",
        label: "Contraseña",
        placeholder: "Ingrese su contraseña",
        componentType: "input",
        type: "password",
    },
];

export const loginFormControls = [
    {
        name: "correo",
        label: "Correo",
        placeholder: "Ingrese su correo",
        componentType: "input",
        type: "email",
    },
    {
        name: "contraseña",
        label: "Contraseña",
        placeholder: "Ingrese su contraseña",
        componentType: "input",
        type: "password",
    },
];

export const addProductFormElements = [
    {
        label: "Titulo",
        name: "titulo",
        componentType: "input",
        type: "text",
        placeholder: "Ingrese el nombre del producto",
    },
    {
        label: "Descripcion",
        name: "descripcion",
        componentType: "textarea",
        placeholder: "Ingrese la descripción del producto",
    },
    {
        label: "Categoria",
        name: "categoria",
        componentType: "select",
        options: [
            { id: "hombre", label: "Hombre" },
            { id: "mujer", label: "Mujer" },
            { id: "niños", label: "Niños" },
            { id: "accesorios", label: "Accesorios" },
            { id: "calzado", label: "Calzado" },
        ],
    },
    {
        label: "Marca",
        name: "marca",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
    {
        label: "Precio",
        name: "precio",
        componentType: "input",
        type: "number",
        placeholder: "Ingrese el precio del producto",
    },
    {
        label: "Precio de Descuento",
        name: "precioVenta",
        componentType: "input",
        type: "number",
        placeholder: "Ingrese el precio de descuento (opcional)",
    },
    {
        label: "Existencia Total",
        name: "existenciaTotal",
        componentType: "input",
        type: "number",
        placeholder: "Ingrese unidades del producto",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id: "inicio",
        label: "Inicio",
        path: "/tienda/inicio",
    },
    {
        id: "productos",
        label: "Productos",
        path: "/tienda/lista",
    },
    {
        id: "hombre",
        label: "Hombre",
        path: "/tienda/lista",
    },
    {
        id: "mujer",
        label: "Mujer",
        path: "/tienda/lista",
    },
    {
        id: "niños",
        label: "Niños",
        path: "/tienda/lista",
    },
    {
        id: "calzado",
        label: "Calzado",
        path: "/tienda/lista",
    },
    {
        id: "accesorios",
        label: "Accesorios",
        path: "/tienda/lista",
    },
    {
        id: "busqueda",
        label: "Busqueda",
        path: "/tienda/busqueda",
    },
];

export const filterOptions = {
    Categoria: [
        { id: "hombre", label: "Hombre" },
        { id: "mujer", label: "Mujer" },
        { id: "niños", label: "Niños" },
        { id: "accesorios", label: "Accesorios" },
        { id: "calzado", label: "Calzado" },
    ],
    Marca: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ],
}

export const categoryOptionsMap = {
    'hombre' : 'Hombre',
    'mujer' : 'Mujer',
    'niños' : 'Niños',
    'accesorios' : 'Accesorios',
    'calzado' : 'Calzado'
}

export const brandOptionsMap = {
    'nike' : 'Nike',
    'adidas' : 'Adidas',
    'puma' : 'Puma',
    'levi' : 'Levi',
    'zara' : 'Zara',
    'h&m' : 'H&M'
}

export const sortOptions = [
    { id: "precio-menoramayor", label: "Precio: Menor a Mayor" },
    { id: "precio-mayoramenor", label: "Precio: Mayor a Menor" },
    { id: "titulo-az", label: "Título: De la A a la Z" },
    { id: "titulo-za", label: "Título: De la Z a la A" },
];