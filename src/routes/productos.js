const {checkBodyProduct,deleteProduct,updateProduct,getProductById,createProduct,fakerProducts,getAllProducts} = require('../controllers/productsController');
const {Router} = require('express');

const router = Router()


router.get('/productos-test', fakerProducts)
router.get('/', getAllProducts)
router.post('/', checkBodyProduct,createProduct)
router.get('/:id', getProductById)
router.put('/:id', checkBodyProduct, updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router