const express = require('express')
const { EventProductController } = require('../controllers/eventProductController')
const router = express.Router()

router.get('/', EventProductController.getAllEventProducts)
router.post('/', EventProductController.addEventProduct)
router.delete('/:id', EventProductController.deleteEventProduct)

module.exports = router