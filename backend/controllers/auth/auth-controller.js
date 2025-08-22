const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/User')

// registro
const registroUsuario = async(req, res) => {
    const { usuario, correo, contraseña } = req.body;
    try {
        const hashContraseña = await bcrypt.hash(contraseña, 12);
        const nuevoUsuario = new Usuario({
            usuario, 
            correo, 
            contraseña: hashContraseña,
        })

        await nuevoUsuario.save()
        res.status(200).json({
            success: true,
            message: 'Se ha registrado correctamente'
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

// inicio de sesión
const login = async(req, res) => {
    const { correo, contraseña } = req.body;
    try {
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}
// cierre de sesión

// middleware de autenticación

module.exports = { registroUsuario }