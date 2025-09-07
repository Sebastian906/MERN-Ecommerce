const { imageUploadUtils } = require("../../helpers/cloudinary");
const Producto = require("../../models/Product");

const manejarCargaImagen = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);
        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Ha ocurrido un error",
        })
    }
}

// agregar un nuevo producto
const agregarProducto = async (req, res) => {
    try {
        const {
            imagen,
            titulo,
            descripcion,
            categoria,
            marca,
            precio,
            precioVenta,
            existenciaTotal,
        } = req.body;
        const nuevoProducto = new Producto({
            imagen,
            titulo,
            descripcion,
            categoria,
            marca,
            precio,
            precioVenta,
            existenciaTotal,
        })
        await nuevoProducto.save();
        res.status(201).json({
            success: true,
            data: nuevoProducto,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

// listar todos los productos
const listarProductos = async (req, res) => {
    try {
        const listaDeProductos = await Producto.find({});
        res.status(200).json({
            success: true,
            data: listaDeProductos
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

// editar un producto
const editarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            imagen,
            titulo,
            descripcion,
            categoria,
            marca,
            precio,
            precioVenta,
            existenciaTotal,
        } = req.body;

        let buscarProducto = await Producto.findById(id);
        if (!buscarProducto) return res.status(404).json({
            success: false,
            message: 'Producto no encontrado',
        });
        buscarProducto.titulo = titulo || buscarProducto.titulo
        buscarProducto.descripcion = descripcion || buscarProducto.descripcion
        buscarProducto.categoria = categoria || buscarProducto.categoria
        buscarProducto.marca = marca || buscarProducto.marca
        buscarProducto.precio = precio === '' ? 0 : precio || buscarProducto.precio
        buscarProducto.precioVenta = precioVenta === '' ? 0 : precioVenta || buscarProducto.precioVenta
        buscarProducto.existenciaTotal = existenciaTotal || buscarProducto.existenciaTotal
        buscarProducto.imagen = imagen || buscarProducto.imagen

        await buscarProducto.save();
        res.status(200).json({
            success: true,
            data: buscarProducto,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

// borrar un producto
const borrarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByIdAndDelete(id);

        if (!producto) return res.status(404).json({
            success: false,
            message: 'Producto no encontrado',
        });

        res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente',
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

module.exports = { manejarCargaImagen, agregarProducto, listarProductos, editarProducto, borrarProducto }