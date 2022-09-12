const knex = require('knex')
const {
    productOptions,
    chatOptions
} = require('../options/options')

class DB {
    constructor(){
        this.mensajes = knex(chatOptions)
        this.productos = knex(productOptions)
    }

    init(){
        this.mensajes.schema.hasTable('mensajes')
            .then((exists) =>{
                if (exists) return;
                console.log('tabla creada')
                return this.mensajes.schema.createTable('mensajes', async (mensajesTabla) => {
                    mensajesTabla.increments();
                    mensajesTabla.string('nombre').notNullable();
                    mensajesTabla.string('mensaje').notNullable();
                    mensajesTabla.timestamps(true, true);
                })
            })


        this.productos.schema.hasTable('productos')
            .then((exists) =>{
                if (exists) return;
                console.log('tabla creada')
                return this.productos.schema.createTable('productos', async (productosTabla) =>{
                    productosTabla.increments();
                    productosTabla.string('nombre').notNullable();
                    productosTabla.integer('precio');
                    productosTabla.string('thumbnail').notNullable();
                    productosTabla.timestamps(true,true)
                })
            })
        

        }
//metodos mensajes
        async getMensajes(tableName, id) {
            if(id) return this.mensajes(`${tableName}`).where('id', id);
            return this.mensajes(`${tableName}`).select('*')
        }
        async postMensajes(tableName, data){
            await this.mensajes(`${tableName}`)
                .insert(data)
                .then(() => {console.log('data inserted')})
                .catch((err) => {
                    console.log('there was an error')
                    console.log(err)
                })
        }
        async updateMensajes(tableName, id, data) {
            return await this.mensajes(`${tableName}`).where('id', id).update(data)
        }
        deleteMensajes(tableName, id){
            this.mensajes(`${tableName}`).del().where('id', id)
            .then(() => {console.log('elemento borrado')})
        }


        //metodos productos
        async getProductos(tableName, id) {
            if(id) return this.productos(`${tableName}`).where('id', id);
            return this.productos(`${tableName}`).select('*')
        }
        async postProductos(tableName, data){
            await this.productos(`${tableName}`)
                .insert(data)
                .then(() => {console.log('data inserted')})
                .catch((err) => {
                    console.log('there was an error')
                    console.log(err)
                })
        }
        async updateProductos(tableName, id, data) {
            return await this.productos(`${tableName}`).where('id', id).update(data)
        }
        deleteProductos(tableName, id){
            this.productos(`${tableName}`).del().where('id', id)
            .then(() => {console.log('elemento borrado')})
        }
}