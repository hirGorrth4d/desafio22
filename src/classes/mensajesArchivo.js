const fs = require('fs')
const normalize = require('normalizr')

const author = new normalize.schema.Entity('author', {}, {idAttribute: 'email'})

const mensaje = new normalize.schema.Entity('mensaje', {author: author}, {idAttribute: '_id'})

const mensajeSchema = new normalize.schema.Array(mensaje)

class Mensajes {
    constructor(file) {
        this.file = file
    }
    async getAll() {
        const data = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(data)
    }
    async save(data){
        await fs.promises.writeFile(this.file, JSON.stringify(data, null, '\t'))
    }
    //get
    async get() {
        const data = await this.getAll()
        let mensajesNormalize = normalize(data, mensajeSchema)
        return mensajesNormalize
    }
    async getDesnormalize() {
        const data = await this.getAll()
        return data
    }

    //post
    async post(item) {
        const data = await this.getAll()
        const newMessage = {
            author: {
                email: item.email,
                nombre: item.nombre,
                edad: item.edad,
            },
            text: item.mensaje
        }

        data.push(newMessage)
        await this.save(data)
    }
}

const MensajesController = new Mensajes('mensajes.json')

module.exports =  {
    MensajesController,
}