const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/User')

// registro
const registroUsuario = async (req, res) => {
    const { usuario, correo, contraseña } = req.body;
    try {

        const verificarUsuario = await Usuario.findOne({ correo });
        if (verificarUsuario) return res.json({
            success: false,
            message: 'Este correo ya está registrado. Por favor ingrese otro correo.'
        })

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
const loginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        const verificarUsuario = await Usuario.findOne({ correo });
        if (!verificarUsuario) return res.json({
            success: false,
            message: "El usuario no existe. Por favor registrese"
        });

        const verificarContraseña = await bcrypt.compare(contraseña, verificarUsuario.contraseña);
        if (!verificarContraseña) return res.json({
            success: false,
            message: "La contraseña es incorrecta."
        });

        const token = jwt.sign({
            id: verificarUsuario._id,
            rol: verificarUsuario.rol,
            correo: verificarUsuario.correo
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Se inicio la sesión correctamente.",
            usuario: {
                correo: verificarUsuario.correo,
                rol: verificarUsuario.rol,
                id: verificarUsuario._id
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        })
    }
}

// cierre de sesión
const logoutUsuario = async (req, res) => {
    res.limpiarCookie('token').json({
        success: true,
        message: 'Se ha cerrado la sesión.'
    })
}

// middleware de autenticación
const authMiddleware = async (req, res, next) => {
    const token = res.cookies.token;
    if (!token) return res.status(401).json({
        success: false,
        message: 'Usuario no autorizado!'
    })

    try {
        const decodificado = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decodificado;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Usuario no autorizado!',
        })
    }
}

module.exports = { registroUsuario, loginUsuario, logoutUsuario, authMiddleware }