const {v4: uuidv4} = require('uuid')
const fyh = Date.now()
const timestamp = new Date(fyh)

const contenenedorMensajes = []

class Mensajes {
    constructor(nombreArray) {
        this.arrayContenedor = nombreArray
    }
    async get(){
        const mensajes = await this.arrayContenedor;
        return mensajes
    }
    async post(mensaje) {
        const mensajes = await this.arrayContenedor;
        let id;
        const mensajeNuevo = {
            id: uuidv4(),
            nombre: mensaje.nombre,
            mensaje: mensaje.mensaje,
            timestamp: timestamp.toUTCString()
        }
        mensajes.push(mensajeNuevo)
    }

    
}

const MensajesController = new Mensajes(contenenedorMensajes)

module.exports = {
    MensajesController
}