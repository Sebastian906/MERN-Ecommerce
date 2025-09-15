const Carrito = require("../../models/Cart");
const Producto = require("../../models/Product");

const agregarAlCarrito = async(req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;
        if ( !usuarioId || !productoId || cantidad <= 0) {
            return res.json(400).json({
                success: false,
                message: 'Los datos ingresados son inválidos.'
            })
        }

        const producto  = await Producto.findById(productoId);

        if (!producto) {
            return res.json(404).json({
                success: false,
                message: 'Producto no encontrado.'
            })
        }

        let carrito = await Carrito.findOne({ usuarioId });

        if (!carrito) {
            carrito = new Carrito({ usuarioId, items: [] })
        }

        const encontrarProductoActual = carrito.items.findIndex(item => item.productoId.toString() === productoId);

        if (encontrarProductoActual === -1) {
            carrito.items.push({ productoId, cantidad })
        } else {
            carrito.items[encontrarProductoActual].cantidad += cantidad
        }
        await carrito.save();
        res.status(200).json({
            success: true,
            data: carrito
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

const listarProductosDelCarrito = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

const actualizarCarrito = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

const eliminarProductosDeCarrito = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

module.exports = {
    agregarAlCarrito,
    listarProductosDelCarrito,
    actualizarCarrito,
    eliminarProductosDeCarrito
}