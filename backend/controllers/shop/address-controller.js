const Cuenta = require('../../models/Address')

const agregarCuenta = async (req, res) => {
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

const listarCuentas = async (req, res) => {
    try {
        const { usuarioId } = req.params();
        if (!usuarioId) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el id del usuario'
            });
        }

        const listaDeCuentas = await Cuenta.find({ usuarioId });

        res.status(200).json({
            success: true,
            data: listaDeCuentas,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

const editarCuenta = async (req, res) => {
    try {
        const { usuarioId, cuentaId } = req.params;
        const formData = req.body;

        if (!usuarioId || !cuentaId) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere del usuario y la cuenta'
            });
        }

        const cuenta = await Cuenta.findOneAndUpdate({
            _id: cuentaId, 
            usuarioId
        }, formData, { new: true });

        if (!cuenta) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: cuenta
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

const eliminarCuenta = async (req, res) => {
    try {
        const { usuarioId, cuentaId } = req.params;

        if (!usuarioId || !cuentaId) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere del usuario y la cuenta'
            });
        }

        const cuenta = await Cuenta.findByIdAndDelete({
            _id: cuentaId,
            usuarioId,
        });

        if (!cuenta) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cuenta eliminada exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

module.exports = { agregarCuenta, listarCuentas, editarCuenta, eliminarCuenta }