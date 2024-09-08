const express = require('express')
const ProductTypeController = require('../controllers/productTypeController')
const { authentication, authorization } = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the producttype
 *         name:
 *           type: string
 *           description: The producttype name
 *       example:
 *         id: 1
 *         name: example name
 */

/**
 * @swagger
 * /product-types:
 *   get:
 *     summary: Returns the list of all the producttypes
 *     tags: [ProductTypes]
 *     responses:
 *       200:
 *         description: The list of the producttypes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductType'
 */
router.get('/', ProductTypeController.getAllProductType)

/**
 * @swagger
 * /product-types:
 *   post:
 *     summary: Create a new producttype
 *     tags: [ProductTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductType'
 *     responses:
 *       200:
 *         description: The producttype was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductType'
 *       500:
 *         description: Error on the internal server
 */
router.post('/', ProductTypeController.addProductType)

/**
 * @swagger
 * /product-types/{id}:
 *   get:
 *     summary: Get the producttype by id
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The producttype id
 *     responses:
 *       200:
 *         description: The producttype description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductType'
 *       404:
 *         description: The producttype was not found
 */
router.get('/:id', ProductTypeController.detailsProductType)

/**
 * @swagger
 * /product-types/{id}:
 *   delete:
 *     summary: Remove the producttype by id
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The producttype id
 * 
 *     responses:
 *       200:
 *         description: Producttype successfully deleted
 *       404:
 *         description: Products type not found
 */
router.delete('/:id', ProductTypeController.deleteProductType)

/**
 * @swagger
 * /product-types/{id}:
 *  put:
 *    summary: Update the producttype by the id
 *    tags: [ProductTypes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The producttype id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductType'
 *    responses:
 *      200:
 *        description: The producttype was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductType'
 *      404:
 *        description: The producttype was not found
 *      500:
 *        description: Error on the internal server
 */
router.put('/:id', ProductTypeController.editProductType)

module.exports = router