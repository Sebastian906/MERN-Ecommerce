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
        const { usuarioId } = req.params

        if (!usuarioId) {
            return res.json(400).json({
                success: false,
                message: 'No se ha encontrado al usuario.'
            })
        }

        const carrito = await Carrito.findOne({ usuarioId }).populate({
            path: 'item.productoId',
            select: "imagen titulo precio precioVenta"
        })

        if (!carrito) {
            return res.json(404).json({
                success: false,
                message: 'No se encontró el carrito.'
            })
        }

        const itemsValidos = carrito.items.filter(productoItem => productoItem.productoId);

        if (itemsValidos.length < carrito.items.length) {
            carrito.items = itemsValidos
            await carrito.save()
        }

        const llenarItemsCarrito = itemsValidos.map(item => ({
            productoId: item.productoId._id,
            imagen: item.productoId.imagen,
            titulo: item.productoId.titulo,
            precio: item.productoId.precio,
            precioVenta: item.productoId.precioVenta,
            cantidad: item.cantidad,
        }))

        res.status(200).json({
            success: true,
            data: {
                ...carrito._doc,
                items: llenarItemsCarrito
            }
        })

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
        const { usuarioId, productoId, cantidad } = req.body;
        if ( !usuarioId || !productoId || cantidad <= 0) {
            return res.json(400).json({
                success: false,
                message: 'Los datos ingresados son inválidos.'
            })
        }

        const carrito = await Carrito.findOne({ usuarioId });

        if (!carrito) {
            return res.json(404).json({
                success: false,
                message: 'No se encontró el carrito.'
            })
        }

        const encontrarProductoActual = carrito.items.findIndex(item => item.productoId.toString() === productoId);

        if (encontrarProductoActual === -1) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro el producto en el carrito.'
            })
        }

        carrito.items[encontrarProductoActual].cantidad = cantidad
        await carrito.save();

        await carrito.populate({
            path: 'items.productoId',
            select: 'imagen titulo precio precioVenta',
        })

        const llenarItemsCarrito = carrito.items.map(item => ({
            productoId: item.productoId ? item.productoId._id : null,
            imagen: item.imagen ? item.productoId.imagen : null,
            titulo: item.titulo ? item.productoId.titulo : 'Producto no encontrado',
            precio: item.precio ? item.productoId.precio : null,
            precioVenta: item.precioVenta ? item.productoId.precioVenta : null,
            cantidad: item.cantidad,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...carrito._doc,
                items: llenarItemsCarrito
            }
        })
    
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