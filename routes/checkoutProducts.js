const express = require('express')
const CheckoutProductController = require('../controllers/checkoutProductController')
const { authenticationUser } = require('../middlewares/auth')
const router = express.Router()

router.get('/', authenticationUser, CheckoutProductController.getAllCheckoutProducts)
router.post('/', authenticationUser, CheckoutProductController.addCheckoutProduct)
router.get('/:id', authenticationUser, CheckoutProductController.detailsCheckoutProduct)

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckoutProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the checkout product
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         checkout:
 *           $ref: '#/components/schemas/Checkout'
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the checkout
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the checkout product was created
 *       example:
 *         product:
 *           id: 1
 *           name: "Product 1"
 *           price: 20.0
 *           stock: 100
 *         checkout:
 *           id: 1
 *           userId: 123
 *           paymentStatus: "dibayar"
 *         quantity: 2
 *         createdAt: "2023-08-27T12:34:56.789Z"
 */

/**
 * @swagger
 * /checkout-products:
 *   get:
 *     summary: Get all checkout products for the authenticated user
 *     tags: [Checkout Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of checkout products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CheckoutProduct'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /checkout-products:
 *   post:
 *     summary: Add a new checkout product or increment the quantity if it already exists
 *     tags: [Checkout Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the product to add to the checkout
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Checkout product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckoutProduct'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /checkout-products/{id}:
 *   get:
 *     summary: Get details of checkout products associated with a specific checkout ID
 *     tags: [Checkout Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the checkout
 *     responses:
 *       200:
 *         description: The list of checkout products for the specified checkout ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CheckoutProduct'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checkout not found
 *       500:
 *         description: Internal server error
 */


module.exports = router
