const express = require('express')
const AdminSellerController = require('../controllers/adminSellerController')
const { authenticationAdminSeller } = require('../middlewares/auth')
const router = express.Router()

router.get('/', AdminSellerController.getAllAdminSellers)
router.get('/order-list', authenticationAdminSeller, AdminSellerController.getOrderListByVoucherCode)
router.get('/notification-count', authenticationAdminSeller, AdminSellerController.getNotificationCountByVoucherCode)
router.get('/transaction-list', authenticationAdminSeller, AdminSellerController.getTransactionListByVoucherCode)
router.post('/register', AdminSellerController.registerAdminSeller)
router.post('/login', AdminSellerController.loginAdminSeller)
router.put('/:id', AdminSellerController.updateAdminSeller)
router.delete('/:id', AdminSellerController.deleteAdminSeller)

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminSeller:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product owner
 *         fullName:
 *           type: string
 *           description: The full name of the product owner
 *         email:
 *           type: string
 *           description: The email address of the product owner
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the product owner
 *         address:
 *           type: string
 *           description: The address of the product owner
 *         imageProfile:
 *           type: string
 *           description: The URL of the product owner's profile image
 *         role:
 *           type: string
 *           description: The role of the product owner (e.g., adminSeller)
 *         voucherCode:
 *           type: string
 *           description: The voucher code associated with the product owner
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the last update to the product owner's information
 *       example:
 *         id: 1
 *         fullName: "Indo Riau"
 *         email: "example@example.com"
 *         phoneNumber: "+1234567890"
 *         address: "123 Main Street"
 *         imageProfile: "profile_image_url_here"
 *         role: "adminSeller"
 *         voucherCode: "IT01"
 *         updatedAt: "2023-08-27T05:41:52.650Z"
 */



/**
 * @swagger
 * /admin-sellers:
 *   get:
 *     summary: Get a list of all admin sellers
 *     tags: [Admin Sellers]
 *     responses:
 *       200:
 *         description: The list of all admin sellers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminSeller'
*/

/**
 * @swagger
 * /admin-sellers/transaction-list:
 *   get:
 *     summary: Get a list of transactions for the admin seller
 *     tags: [Admin Sellers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminSeller'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin-sellers/notification-count:
 *   get:
 *     summary: Get the notification count for the admin seller
 *     tags: [Admin Sellers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The notification count
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 5
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /admin-sellers/order-list:
 *   get:
 *     summary: Get a list of orders for the admin seller
 *     tags: [Admin Sellers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminSeller'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /admin-sellers:
 *   post:
 *     summary: Register a new admin seller
 *     tags: [Admin Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminSeller'
 *     responses:
 *       201:
 *         description: The newly registered admin seller
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminSeller'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /admin-sellers/login:
 *   post:
 *     summary: Login as an admin seller
 *     tags: [Admin Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the admin seller
 *               password:
 *                 type: string
 *                 description: The password of the admin seller
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: The JWT access token
 *                 adminSeller:
 *                   $ref: '#/components/schemas/AdminSeller'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin-sellers/{id}:
 *   put:
 *     summary: Update an existing admin seller
 *     tags: [Admin Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the admin seller to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminSeller'
 *     responses:
 *       200:
 *         description: The updated admin seller
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminSeller'
 *       404:
 *         description: Admin seller not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /admin-sellers/{id}:
 *   delete:
 *     summary: Delete an admin seller by ID
 *     tags: [Admin Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the admin seller to delete
 *     responses:
 *       204:
 *         description: Admin seller deleted successfully
 *       404:
 *         description: Admin seller not found
 */



module.exports = router

