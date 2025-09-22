const agregarCuenta = async(req, res) => {
    try {
        
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