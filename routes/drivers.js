const express = require('express')
const { authentication, authorization } = require('../middlewares/auth')
const DriverController = require('../controllers/driverController')
const router = express.Router()

router.post('/register', DriverController.registerDriver)
router.post('/login', DriverController.loginDriver)

module.exports = router