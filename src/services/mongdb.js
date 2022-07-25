const mongoose = require('mongoose');

const connection = 'mongodb://localhost:27017/ecommerce'

export const initDB = async () => {
    try {
        console.log('conectando a db')
        await mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('conectado')
    } catch (err) {
        throw err
    };
}