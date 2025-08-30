const express = require('express');

const { handleImageUpload } = require('../../controllers/admin/products-controller')

const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.post('/subir-imagen', upload.single('archivo'), handleImageUpload);

module.exports = router;