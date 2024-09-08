const express = require('express')
const OrderProductController = require('../controllers/orderProductController')
const router = express.Router()

router.get('/', OrderProductController.getAllOrderProducts)
router.post('/', OrderProductController.addOrderProduct)

module.exports = router