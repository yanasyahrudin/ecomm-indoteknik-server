const express = require('express')
const CheckoutController = require('../controllers/checkoutController')
const { authenticationUser, authenticationAdminSeller } = require('../middlewares/auth')

const router = express.Router()

router.get('/', CheckoutController.getAllCheckouts)
router.post('/', authenticationUser, CheckoutController.addCheckout)
router.get('/:id', CheckoutController.detailsCheckout)
router.put('/:id', CheckoutController.editCheckout)
router.delete('/:id', CheckoutController.deleteCheckout)

/**
 * @swagger
 * components:
 *   schemas:
 *     Checkout:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the checkout
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the checkout
 *         totalPrice:
 *           type: number
 *           description: The total price of the checkout
 *         paymentStatus:
 *           type: string
 *           description: The payment status of the checkout
 *         paymentMethod:
 *           type: string
 *           description: The payment method used for the checkout
 *         shippingAddress:
 *           type: string
 *           description: The shipping address for delivery
 *         voucherCode:
 *           type: string
 *           description: The voucher code applied to the checkout
 *         setPPN:
 *           type: boolean
 *           description: Indicates whether PPN (Value Added Tax) is set
 *         shippingMethod:
 *           type: string
 *           description: The shipping method chosen for the checkout
 *         deliveryStatus:
 *           type: string
 *           description: The delivery status of the checkout
 *         midtransCode:
 *           type: string
 *           description: The Midtrans code associated with the checkout
 *         shippingCost:
 *           type: number
 *           description: The shipping cost for the checkout
 *         trackingNumber:
 *           type: string
 *           description: The tracking number for the delivery
 *         isPickUpInStore:
 *           type: boolean
 *           description: Indicates whether the checkout is for store pickup
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the checkout was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the checkout was last updated
 *       example:
 *         id: 150
 *         userId: 5
 *         totalPrice: null
 *         paymentStatus: null
 *         paymentMethod: null
 *         shippingAddress: null
 *         voucherCode: "MS01"
 *         setPPN: null
 *         shippingMethod: null
 *         deliveryStatus: "Sedang dikemas"
 *         midtransCode: "JUVINDO-ORDERID-3920097"
 *         shippingCost: null
 *         trackingNumber: null
 *         isPickUpInStore: false
 *         createdAt: "2023-09-07T07:19:24.240Z"
 *         updatedAt: "2023-09-07T07:19:24.240Z"
 */

/**
 * @swagger
 * /checkouts:
 *   get:
 *     summary: Get all checkouts
 *     tags: [Checkouts]
 *     responses:
 *       200:
 *         description: The list of checkouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Add a new checkout
 *     tags: [Checkouts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Checkout'
 *     responses:
 *       201:
 *         description: Checkout added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /checkouts/{id}:
 *   get:
 *     summary: Get details of a specific checkout
 *     tags: [Checkouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the checkout
 *     responses:
 *       200:
 *         description: Details of the specified checkout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: Checkout not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a specific checkout
 *     tags: [Checkouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the checkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Checkout'
 *     responses:
 *       201:
 *         description: Checkout updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checkout not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a specific checkout
 *     tags: [Checkouts]
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
 *         description: Checkout deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checkout not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;
