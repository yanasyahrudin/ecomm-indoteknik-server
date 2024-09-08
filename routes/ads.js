const express = require('express')
const AdController = require('../controllers/adController')
const router = express.Router()

router.get('/', AdController.getAllAds)
router.post('/', AdController.addAd)
router.get('/:id', AdController.detailsAd)
router.put('/:id', AdController.updateAd)
router.delete('/:id', AdController.deleteAd)

module.exports = router