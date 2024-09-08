const express = require('express')
const ProductShippingController = require('../controllers/productShippingController')
const router = express.Router()

router.get('/', ProductShippingController.getAllProductShippings)
router.post('/', ProductShippingController.addProductShipping)
router.get('/:id', ProductShippingController.detailsProductShipping)
router.put('/:id', ProductShippingController.editProductShipping)
router.delete('/:id', ProductShippingController.deleteProductShipping)

module.exports = router
