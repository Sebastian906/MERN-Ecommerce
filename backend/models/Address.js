const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    usuarioId: String,
    cuenta: String,
    ciudad: String,
    codigopin: String,
    telefono: String,
    notas: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Cuenta', AddressSchema);