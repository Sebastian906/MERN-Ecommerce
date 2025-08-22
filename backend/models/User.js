const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'usuario'
    }
});

const Usuario = mongoose.model('Usuario', UserSchema);
module.exports = Usuario