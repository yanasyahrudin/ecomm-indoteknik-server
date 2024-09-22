const express = require('express');
const { authenticationUser } = require('../middlewares/auth');
const MidtransController = require('../controllers/midtransController');
const router = express.Router();


router.post('/donik', authenticationUser,MidtransController.midtransTokenDonik);

router.post('/payment-successful', MidtransController.paymentSuccessful);

module.exports = router;
