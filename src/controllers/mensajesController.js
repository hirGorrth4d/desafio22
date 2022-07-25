const mensajesArchivo = require('../classes/mensajesArchivo');

const checkBodyMsg = async (req, res, next) => {
    const {nombre, mensaje} = req.body;
    if (!nombre || !mensaje){
        return res.status(400).json({
            msg: 'no hay mensaje'
        })
    }
}

const getAllMsg = async (req,res) => {
    try {
        const msg = await mensajesArchivo.get()
        res.json({msg})
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        })
    };
}

const getAllMsgDesnormalized = async (req,res) => {
    try {
        const msg = await mensajesArchivo.getDesnormalize()
        res.json({
            msg
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        })
    };
}

const sendMsg = async (req,res) => {
    try {
        const {email, nombre, apellido, edad, alias, avatar, mensaje} = req.body;
        const mensajeNuevo = {email,nombre,apellido,edad,alias,avatar,mensaje}

        if(!mensaje){
            return res.status(400).json({
                msg: 'mensaje invalido'
            })
        }
        await mensajesArchivo.post(mensajeNuevo)
        res.json({
            data: mensajeNuevo
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        })
    };
}

module.exports = {
    sendMsg,
    getAllMsgDesnormalized,
    getAllMsg,
    checkBodyMsg
}