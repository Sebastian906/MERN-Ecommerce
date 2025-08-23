const express = require('express')
const { registroUsuario } = require('../../controllers/auth/auth-controller')

const router = express.Router()

router.post('/registro', registroUsuario)

module.exports = router;