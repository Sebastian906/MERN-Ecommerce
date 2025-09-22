const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    usuarioId: String,
    direccion: String,
    ciudad: String,
    codigopin: String,
    telefono: String,
    notas: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Cuenta', CartSchema);