const express = require('express');

const {
    agregarCuenta,
    listarCuentas,
    editarCuenta,
    eliminarCuenta
} = require('../../controllers/shop/address-controller');

const router = express.Router();

router.post('/agregar', agregarCuenta)
router.get('/listar/:usuarioId', listarCuentas)
router.put('/editar/:usuarioId/:cuentaId', editarCuenta)
router.delete('/eliminar/:usuarioId/:cuentaId', eliminarCuenta)

module.exports = router;