const Product = require("../../models/Product");

const obtenerProductosFiltrados = async (req, res) => {
    try {
        // Mapear los nombres de los filtros del frontend a los del modelo
        const {
            Categoria = [],
            Marca = [],
            ordenarPor = "precio-menoramayor"
        } = req.query;
        let filtros = {};

        if (Categoria.length) {
            filtros.categoria = { $in: Categoria.split(',') };
        }
        if (Marca.length) {
            filtros.marca = { $in: Marca.split(',') };
        }

        let ordenar = {};
        switch (ordenarPor) {
            case "precio-menoramayor":
                ordenar.precio = 1;
                break;
            case "precio-mayoramenor":
                ordenar.precio = -1;
                break;
            case "titulo-az":
                ordenar.titulo = 1;
                break;
            case "titulo-za":
                ordenar.titulo = -1;
                break;
            default:
                ordenar.precio = 1;
                break;
        }

        const productos = await Product.find(filtros).sort(ordenar);
        res.status(200).json({
            success: true,
            data: productos
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        });
    }
};

const obtenerDetallesProductos = async(req, res) => {
    try {
        const { id } = req.params;
        const producto = await Product.findById(id);

        if(!producto) return res.status(404).json({
            success: false,
            message: 'No se ha encontrado el producto'
        })
        res.status(200).json({
            success: true,
            data: producto
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        });
    }
}

module.exports = { obtenerProductosFiltrados, obtenerDetallesProductos };