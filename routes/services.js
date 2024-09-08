const express = require('express')
const ServiceController = require('../controllers/serviceController')
const router = express.Router()

router.get('/', ServiceController.getAllServices)
router.post('/', ServiceController.addService)
router.get('/:id', ServiceController.detailsService)
router.delete('/:id', ServiceController.deleteService)
router.put('/:id', ServiceController.editService)

module.exports = router