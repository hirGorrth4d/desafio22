const {faker} = require('@faker-js/faker');

faker.locale = 'es'

const fakerDB = []

for(let i = 0; i <5; i++){
    fakerDB.push({
        thumbnail: faker.image.imageUrl(),
        id: faker.database.mongodbObjectId(),
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(100, 4500, 0)
    })
}

class Productos {
    constructor(nombre) {
        this.nombre = nombre
    }

    async get(){
        const productos = await this.nombre
        return productos
    }
}

const ProductosController = new Productos(fakerDB)

module.exports = {
    ProductosController: ProductosController
}