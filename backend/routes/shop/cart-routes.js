const express = require('express');

const { 
    agregarAlCarrito, 
    listarProductosDelCarrito, 
    actualizarCarrito, 
    eliminarProductosDeCarrito 
} = require('../../controllers/shop/cart-controller');

const router = express.Router();

router.post('/agregar-carrito', agregarAlCarrito);
router.get('/listar-carrito/:usuarioId', listarProductosDelCarrito);
router.put('/actualizar-carrito', actualizarCarrito);
router.delete('/:usuarioId/:productoId', eliminarProductosDeCarrito);

module.exports = router;