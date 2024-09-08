const express = require('express');
const { authenticationUser } = require('../middlewares/auth');
const ProductOwnerController = require('../controllers/productOwnerController');
const router = express.Router()

router.get('/', ProductOwnerController.getAllProductOwners);
router.post('/', ProductOwnerController.addProductOwner);
router.get('/:id', ProductOwnerController.detailsProductOwner);
router.delete('/:id', ProductOwnerController.deleteProductOwner);
router.put('/:id', ProductOwnerController.editProductOwner);

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductOwner:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product owner
 *         name:
 *           type: string
 *           description: The name of the product owner
 *         address:
 *           type: string
 *           description: The address of the product owner
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the product owner
 *         paymentGatewayId:
 *           type: integer
 *           description: The payment gateway id of the product owner
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp of the product owner
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp of the product owner
 *       example:
 *         - id: 1
 *           name: Indo Riau
 *           address: 123 Main Street
 *           phoneNumber: 555-1234
 *           paymentGatewayId: 101
 *           createdAt: "2023-08-27T05:41:52.650Z"
 *           updatedAt: "2023-08-27T05:41:52.650Z"
 */

/**
 * @swagger
 * /product-owners:
 *   get:
 *     summary: Get a list of all product owners
 *     tags: [Product Owners]
 *     responses:
 *       200:
 *         description: The list of all product owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductOwner'
 */

/**
 * @swagger
 * /product-owners/{id}:
 *   get:
 *     summary: Get a product owner by ID
 *     tags: [Product Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product owner to retrieve
 *     responses:
 *       200:
 *         description: The retrieved product owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOwner'
 *       404:
 *         description: Product owner not found
 */


/**
 * @swagger
 * /product-owners:
 *   post:
 *     summary: Add a new product owner
 *     tags: [Product Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductOwner'
 *     responses:
 *       201:
 *         description: The newly added product owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOwner'
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /product-owners/{id}:
 *   put:
 *     summary: Update an existing product owner
 *     tags: [Product Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product owner to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductOwner'
 *     responses:
 *       200:
 *         description: The updated product owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOwner'
 *       404:
 *         description: Product owner not found
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /product-owners/{id}:
 *   delete:
 *     summary: Delete a product owner by ID
 *     tags: [Product Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product owner to delete
 *     responses:
 *       204:
 *         description: Product owner deleted successfully
 *       404:
 *         description: Product owner not found
 */


module.exports = router