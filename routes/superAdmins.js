const express = require('express')
const SuperAdminController = require('../controllers/superAdminController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', SuperAdminController.registerSuperAdmin)
router.post('/login', SuperAdminController.loginSuperAdmin)
router.get('/transactions', authentication, SuperAdminController.getAllTransactions)

/**
 * @swagger
 * /super-admin/register:
 *   post:
 *     summary: Register a new Super Admin
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               imageProfile:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - fullName
 *               - phoneNumber
 *               - address
 *               - imageProfile
 *     responses:
 *       201:
 *         description: Super Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 superAdmin:
 *                   $ref: '#/components/schemas/SuperAdmin'
 */

/**
 * @swagger
 * /super-admin/login:
 *   post:
 *     summary: Login as a Super Admin
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Super Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 fullName:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

// /**
//  * @swagger
//  * /super-admin/transactions:
//  *   get:
//  *     summary: Get all transactions
//  *     tags: [SuperAdmin]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of all transactions
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               additionalProperties:
//  *                 type: array
//  *                 items:
//  *                   $ref: '#/components/schemas/Transaction'
//  *       401:
//  *         description: Unauthorized, missing or invalid token
//  */

module.exports = router