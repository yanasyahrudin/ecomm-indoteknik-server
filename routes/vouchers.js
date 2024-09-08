const express = require('express')
const VoucherController = require('../controllers/voucherController')
const { authentication, authorization, authenticationAdminSeller, authorizationAdminSeller } = require('../middlewares/auth')
const router = express.Router()

router.get('/', VoucherController.getAllVouchers)
router.post('/', authentication, authenticationAdminSeller, authorization, authorizationAdminSeller, VoucherController.addVoucher)
router.get('/:id', VoucherController.detailsVoucher)
router.put('/:id', authentication, authenticationAdminSeller, authorization, authorizationAdminSeller, VoucherController.editVoucher)
if (router.use(authentication, authorization) || router.use(authenticationAdminSeller, authorizationAdminSeller)) {
    router.delete('/:id', VoucherController.deleteVoucher)
}

module.exports = router