const express = require('express')
const ProductCategoryController = require('../controllers/productCategoryController')
const { authenticationWarehouseAdmin, authorizationWarehouseAdmin } = require('../middlewares/auth')
const bodyParser = require('body-parser');
const router = express.Router()
const multer = require('multer');
const fileStorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + '-' + file.originalname)
        }
    }
); // Tentukan folder tujuan untuk menyimpan file yang diunggah

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const maxSize = 3 * 1024 * 1024 // 3 MB, sesuaikan dengan batas yang Anda inginkan

router.use(bodyParser.json());
router.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize // Batas ukuran berkas
    }
}).single('image'))

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        // Kesalahan dari multer (misalnya, ukuran berkas terlalu besar)
        res.status(400).json({ error: 'File size is too large' });
    } else {
        // Kesalahan lain
        res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
});

router.get('/', ProductCategoryController.getAllProductCategories)
router.post('/', authenticationWarehouseAdmin, authorizationWarehouseAdmin, ProductCategoryController.addProductCategory)
router.get('/:id', ProductCategoryController.detailsProductCategory)
router.delete('/:id', ProductCategoryController.deleteProductCategory)
router.put('/:id', authenticationWarehouseAdmin, authorizationWarehouseAdmin, ProductCategoryController.editProductCategory)

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product category
 *         name:
 *           type: string
 *           description: The name of the product category
 *         description:
 *           type: string
 *           description: Description of the product category
 *         image:
 *           type: string
 *           format: binary
 *           description: Image file of the product category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the product category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the product category was last updated
 *       example:
 *         id: 1
 *         name: "Electronics"
 *         description: "Category for electronic products"
 *         image: "electronic_category_image.jpg"
 *         createdAt: "2023-09-07T07:19:24.240Z"
 *         updatedAt: "2023-09-08T10:30:45.123Z"
 */



/**
 * @swagger
 * /product-categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Product Categories]
 *     responses:
 *       200:
 *         description: The list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Add a new product category
 *     tags: [Product Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product category
 *               description:
 *                 type: string
 *                 description: Description of the product category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the product category (PNG, JPEG, JPG)
 *             required:
 *               - name
 *               - image
 *     responses:
 *       201:
 *         description: Product category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /product-categories/{id}:
 *   get:
 *     summary: Get details of a specific product category
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product category
 *     responses:
 *       200:
 *         description: Details of the specified product category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       404:
 *         description: Product category not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a specific product category
 *     tags: [Product Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product category
 *     responses:
 *       200:
 *         description: Product category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product category not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a specific product category
 *     tags: [Product Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product category
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the product category
 *               description:
 *                 type: string
 *                 description: The new description of the product category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new image file of the product category (PNG, JPEG, JPG)
 *             required:
 *               - name
 *               - image
 *     responses:
 *       200:
 *         description: Product category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product category not found
 *       500:
 *         description: Internal server error
 */



module.exports = router