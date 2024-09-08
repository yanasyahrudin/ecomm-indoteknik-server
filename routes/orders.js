const express = require('express')
const OrderController = require('../controllers/orderController')
const { authenticationUser } = require('../middlewares/auth')
const router = express.Router()

router.use(authenticationUser)

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - transactionId
 *         - productId
 *         - qty
 *         - totalPrice
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the order
 *         userId:
 *           type: string
 *           description: The order userId
 *         transactionId:
 *           type: integer
 *           description: The order category id
 *         productId:
 *           type: integer
 *           description: The order type id
 *         qty:
 *           type: string
 *           description: The order qty
 *       example:
 *         id: 1
 *         userId: userId order
 *         transactionId: 1
 *         productId: 1
 *         qty: qty product
 *         totalPrice: totalPrice product
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', OrderController.getAllOrders)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error on the internal server
 */
router.post('/:id', OrderController.addOrder)
// router.get('/:id', OrderController.addOrder)

module.exports = router