const express = require('express')
const WishlistController = require('../controllers/wishlistController')
const router = express.Router()
const { authenticationUser } = require('../middlewares/auth')

router.use(authenticationUser)
router.get('/', WishlistController.getAllWishlists)
router.post('/:id', WishlistController.addWishlist)
router.delete('/:id', WishlistController.removeWishlist)

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the wishlist item
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the wishlist item
 *         productId:
 *           type: integer
 *           description: The ID of the product in the wishlist item
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the wishlist item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the wishlist item was last updated
 *       example:
 *         id: 1
 *         userId: 123
 *         productId: 456
 *         createdAt: "2023-09-07T07:19:24.240Z"
 *         updatedAt: "2023-09-07T07:19:24.240Z"
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get all wishlists
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of wishlists for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wishlist'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to add to the wishlist
 *     responses:
 *       201:
 *         description: Product added to the wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 * /wishlist/{id}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the wishlist item to remove
 *     responses:
 *       200:
 *         description: Product removed from the wishlist successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;


module.exports = router