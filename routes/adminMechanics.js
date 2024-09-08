const express = require('express')
const AdminMechanicController = require('../controllers/adminMechanicController')
const router = express.Router()

router.post('/register', AdminMechanicController.registerAdminMechanic)
router.post('/login', AdminMechanicController.loginAdminMechanic)
router.put('/:id', AdminMechanicController.updateAdminMechanic)
module.exports = router