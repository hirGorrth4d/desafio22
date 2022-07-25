const {Router} = require('express');
const {checkBodyMsg, getAllMsg, sendMsg, getAllMsgDesnormalized} = require('../controllers/mensajesController');

const router = Router()

router.get('/', getAllMsg)
router.get('/desnormalized', getAllMsgDesnormalized)
router.post('/', checkBodyMsg, sendMsg)

module.exports = router