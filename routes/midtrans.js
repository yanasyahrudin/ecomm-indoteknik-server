const express = require('express')
const { authenticationUser } = require('../middlewares/auth')
const MidtransController = require('../controllers/midtransController')
const router = express.Router()

router.post('/payment-successful', MidtransController.paymentSuccessful)
router.use(authenticationUser)
router.post('/indo-riau', MidtransController.midtransTokenIndoRiau)
router.post('/juvindo', MidtransController.midtransTokenJuvindo)
router.post('/itech', MidtransController.midtransTokenItech)
router.post('/indo-teknik', MidtransController.midtransTokenIndoTeknik)
router.post('/donik', MidtransController.midtransTokenDonik)

module.exports = router