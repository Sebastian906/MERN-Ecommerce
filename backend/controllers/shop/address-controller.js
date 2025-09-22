const Cuenta = require('../../models/Address')

const agregarCuenta = async(req, res) => {
    try {
        const { usuarioId, direccion, ciudad, codigopin, telefono, notas } = req.body;
        if (!usuarioId || !direccion || !ciudad || !codigopin || !telefono || !notas) {
            return res.status(400).json({
                success: false,
                message: 'Datos inválidos!'
            })
        }
        const nuevaCuenta = new Cuenta({
            usuarioId, direccion, ciudad, codigopin, telefono, notas
        })

        await nuevaCuenta.save();

        res.status(201).json({
            success: true,
            data: nuevaCuenta
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

const listarCuentas = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

const editarCuenta = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

const eliminarCuenta = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

module.exports = { agregarCuenta, listarCuentas, editarCuenta, eliminarCuenta }