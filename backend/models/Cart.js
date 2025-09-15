const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    items: [
        {
            productoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Carrito', CartSchema);