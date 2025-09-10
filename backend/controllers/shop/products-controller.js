const Product = require("../../models/Product");

const obtenerProductosFiltrados = async(req, res) => {
    try {
        const productos = await Product.find({})
        res.status(200).json({
            success: true,
            data: productos
        })
    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

module.exports = { obtenerProductosFiltrados };