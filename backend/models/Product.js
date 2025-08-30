const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imagen: String,
    titulo: String,
    descripcion: String,
    categoria: String,
    marca: String,
    precio: Number,
    precioVenta: Number,
    existenciaTotal: Number,
},  { timestamps: true }
);

module.exports = mongoose.model('Productos', ProductSchema)