const {Router} = require('express');
const mensajeRouter = require('./mensajes');
const productosRouter = require('./productos')


const router = Router()

router.use('/mensajes', mensajeRouter)
router.use('/productos', productosRouter)

module.exports = router