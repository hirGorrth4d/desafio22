const dbSql = require('../classes/dbsql');
const ProductosController = require('../classes/productosFaker');

checkBodyProduct = async (req,res,next) => {
    const {nombre, precio, thumbnail} = req.body;
    if (!nombre || !precio || ! thumbnail)
    return res.status(400).json({
        msg: 'missing body fields'
    })
    next();
}

const fakerProducts = async(req,res) =>{
    try {
        const productos = await ProductosController.get()
        res.json({
            data: productos
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const productos = await ProductosController.get()
        res.json({
            data: productos
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    };
}

const createProduct = (req,res) =>{
    try {
        const {nombre, precio, thumbnail} = req.body;
        const newProduct = {nombre, precio, thumbnail}
        dbSql.post('productos', newProduct)
        res.json({
            data: newProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    };
}


const getProductById = async(req,res) =>{
    try {
        const {id} = req.params;
        const producto = await dbSql.get('productos', id)
        if(!producto) 
        return res.status(400).json({
            msgs: ' producto not found'
        })
        res.json({
            data: producto
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    };
}
const updateProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const {nombre, precio, thumbnail} = req.body;
        let productToUpdate = {nombre,precio,thumbnail}
        const producto = dbSql.update('productos',id,productToUpdate)
        res.json({
            msg:'product updated',
            data: producto
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    };
}

const deleteProduct = async (req,res) => {
    try {
        const {id} =req.params;
        const producto = await dbSql.delete('productos')
        if (!producto)
        return res.status(400).json({
            msgs: 'no encontrado'
        })
        else await dbSql.delete('productos', id)

        res.json({
            msg: 'borrado'
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        })
    };
}

module.exports = {checkBodyProduct,deleteProduct,updateProduct,getProductById,createProduct,fakerProducts,getAllProducts}