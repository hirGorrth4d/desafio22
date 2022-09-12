const fs = require('fs');
const {v4: uuidv4} = require('uuid');

class Productos {
    constructor (nombreArchivo){
        this.archivo = nombreArchivo
    }

    async getData() {
        const data = await fs.promises.readFile(this.archivo, 'utf-8');
        return JSON.parse(data)
    }
    async saveData(data) {
        await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'))
    }
    async get(){
        const productos = await this.getData();
        return productos
    }
    async getById(id) {
        const productos = await this.getData();
        const indice = productos.findIndex((prod) =>{
            if (prod.id === id) return true;
            else return false;
        })
        if (indice === -1) return null;

        return productos[indice]
    }

    async post(obj) {
        const productos = await this.getData();
        let id;
        const productoNuevo = {
            id: uuidv4(),
            nombre: obj.nombre,
            precio: obj.precio,
            thumbnail: obj.thumbnail,
        }
        productos.push(productoNuevo)
        await this.saveData(productos)
    }

    async delete(id) {
        const productos = await this.getData();
        const nuevoArray = productos.filter(
            (prod) => prod.id != id
        )
        await this.saveData(nuevoArray)
    }

    async update(id, nuevaData) {
        const productos = await this.get();
        const indice = productos.findIndex((prdo) => {prod.id === id}
        )
        if (indice < 0) throw new Error('no existe el producto')
        const productUpdated = {id, ...nuevaData}
        productos.splice(indice, 1, productUpdated)
        await this.saveData(productos)
        return productUpdated
    }
}


const ProductosController = new Productos('productos.json')

module.exports = ProductosController