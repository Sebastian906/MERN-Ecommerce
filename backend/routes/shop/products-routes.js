const express = require('express');

const { 
    obtenerProductosFiltrados,
    obtenerDetallesProductos
} = require('../../controllers/shop/products-controller')

const router = express.Router();

router.get('/listar', obtenerProductosFiltrados);
router.get('/listar/:id', obtenerDetallesProductos);

module.exports = router;