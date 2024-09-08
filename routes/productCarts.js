const express = require("express");
const ProductCartController = require("../controllers/productCartController");
const router = express.Router();
const { authenticationUser } = require("../middlewares/auth");

router.use(authenticationUser)
router.get("/", ProductCartController.getAllProductCarts);
router.get("/count-carts", ProductCartController.getCountCarts);
router.get("/itech", ProductCartController.getAllProductsItech);
router.get("/indo-riau", ProductCartController.getAllProductsIndoRiau);
router.get("/indo-teknik", ProductCartController.getAllProductsIndoTeknik);
router.get("/juvindo", ProductCartController.getAllProductsJuvindo);
router.post("/", ProductCartController.addProductCart);
router.delete("/clear/", ProductCartController.clearProductCart)
router.patch("/decrement/:id", ProductCartController.decrementQtyProductCart);
router.patch("/increment/:id", ProductCartController.incrementQtyProductCart)
router.delete("/remove/:id", ProductCartController.removeProductCart)
router.get("/:id", ProductCartController.detailsProductCart);

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product cart
 *         cartId:
 *           type: integer
 *           description: The ID of the cart associated with the product cart
 *         productId:
 *           type: integer
 *           description: The ID of the product associated with the product cart
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the product cart was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the product cart was last updated
 *       example:
 *         id: 1
 *         cartId: 5
 *         productId: 10
 *         quantity: 2
 *         createdAt: "2023-09-07T07:19:24.240Z"
 *         updatedAt: "2023-09-07T07:19:24.240Z"
 */

/**
 * @swagger
* /product-carts/count-carts:
*   get:
*     summary: Get the total quantity of products in the user's cart
*     tags: [Product Carts]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: The total quantity of products in the user's cart
*         content:
*           application/json:
*             schema:
*               type: integer
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
 * @swagger
 * /product-carts:
 *   get:
 *     summary: Get all product carts
 *     tags: [Product Carts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of product carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Add a new product to the cart
 *     tags: [Product Carts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: The ID of the product to add to the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       201:
 *         description: Product added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /product-carts/{id}:
 *   get:
 *     summary: Get details of a specific product in the cart
 *     tags: [Product Carts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product cart
 *     responses:
 *       200:
 *         description: Details of the specified product in the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product cart not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update the quantity of a specific product in the cart
 *     tags: [Product Carts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product in the cart
 *             required:
 *               - quantity
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product cart not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Remove a specific product from the cart
 *     tags: [Product Carts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product cart
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product cart not found
 *       500:
 *         description: Internal server error
 */



module.exports = router;