const express = require('express')
const { registroUsuario, loginUsuario } = require('../../controllers/auth/auth-controller')

const router = express.Router()

router.post('/registro', registroUsuario);
router.post('/iniciar-sesion', loginUsuario);

module.exports = router;