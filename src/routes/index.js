const {Router} = require('express');
const mensajeRouter = require('./mensajes');

const router = Router()

router.use('/mensajes', mensajeRouter)

module.exports = router