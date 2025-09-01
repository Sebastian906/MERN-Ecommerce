const express = require('express');

const { 
    manejarCargaImagen,
    agregarProducto, 
    listarProductos,
    editarProducto, 
    borrarProducto
} = require('../../controllers/admin/products-controller')

const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.post('/subir-imagen', upload.single('archivo'), manejarCargaImagen);
router.post('/agregar', agregarProducto)
router.get('/lista', listarProductos)
router.put('/editar/:id', editarProducto)
router.delete('/borrar/:id', borrarProducto)

module.exports = router;