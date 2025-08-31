const express = require('express');

const { manejarCargaImagen } = require('../../controllers/admin/products-controller')

const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.post('/subir-imagen', upload.single('archivo'), manejarCargaImagen);

module.exports = router;