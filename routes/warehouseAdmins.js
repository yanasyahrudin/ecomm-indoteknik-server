const express = require('express')
const WarehouseAdminController = require('../controllers/warehouseAdminController')
const router = express.Router()

router.get('/', WarehouseAdminController.getAllWarehouseAdmins)
router.post('/register', WarehouseAdminController.registerWarehouseAdmin)
router.post('/login', WarehouseAdminController.loginWarehouseAdmin)

module.exports = router