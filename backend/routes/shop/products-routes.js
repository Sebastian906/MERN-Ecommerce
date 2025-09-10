const express = require('express');

const { 
    obtenerProductosFiltrados
} = require('../../controllers/shop/products-controller')

const router = express.Router();

router.get('/listar', obtenerProductosFiltrados)

module.exports = router;