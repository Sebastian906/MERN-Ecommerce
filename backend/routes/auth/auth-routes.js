const express = require('express')
const { registroUsuario, loginUsuario, logoutUsuario, authMiddleware } = require('../../controllers/auth/auth-controller')

const router = express.Router()

router.post('/registro', registroUsuario);
router.post('/iniciar-sesion', loginUsuario);
router.post('/cerrar-sesion', logoutUsuario);
router.get('/verificar-autenticacion', authMiddleware, (req, res) => {
    const usuario = req.usuario;
    res.status(200).json({
        success: true,
        message: 'Usuario Autenticado!',
        usuario
    })
})

module.exports = router;