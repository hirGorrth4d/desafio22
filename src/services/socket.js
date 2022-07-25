const {Server} = require('socket.io');
const {productosFaker} = require('../classes/productosFaker');
const {mensajesArchivo} = require('../classes/mensajesArchivo');

const io = new Server()

const newIoServer = () =>{
    io.on('connection', (socket) => {
        console.log("new connection");
        console.log(new Date())

        socket.on('allProducts', async () => {
            const productos = await productosFaker.get()

            productos.forEach((prod) =>{
                socket.emit('productos', prod)
            })
        })
        socket.on('allMessages', async () => {
            const mensajes = await mensajesArchivo.get()
            socket.emit('mensaje', mensajes)
        })
    })

}
const socketEmit = (eventName, message) => {
    io.emit(eventName, message)
}

module.exports = {
    newIoServer,
    socketEmit
}