const express = require('express')
const CartController = require('../controllers/cartController')
const { authenticationUser } = require('../middlewares/auth')
const router = express.Router()

router.use(authenticationUser)
router.get('/', CartController.getAllCarts)
router.get('/userId', CartController.getCartByUserId)
router.get('/:id', CartController.addCart)

module.exports = router