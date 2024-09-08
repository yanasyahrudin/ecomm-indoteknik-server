const express = require('express')
const ProductController = require('../controllers/productController')
const { authorizationWarehouseAdmin, authenticationWarehouseAdmin } = require('../middlewares/auth')
const bodyParser = require('body-parser'); // Tambahkan ini
const router = express.Router()
const multer = require('multer');
const path = require('path')
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

router.get('/', ProductController.getAllProducts);
router.get('/nozzle', ProductController.getNozzelCategory);
router.get('/delivery-valve', ProductController.getDeliveryValve);
router.get('/element', ProductController.getElementCategory);
router.get('/ve-pump', ProductController.getVEPumpCategory);
router.get('/ve-pump-parts', ProductController.getVEPumpPartsCategory);
router.get('/head-rotor', ProductController.getHeadRotorCategory);
router.post('/',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin,
    ProductController.addProduct)
router.get('/:id', ProductController.detailsProduct)
router.delete('/:id',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin,
    ProductController.deleteProduct)
router.put('/:id',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin,
    ProductController.editProduct)

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         categoryId:
 *           type: integer
 *           description: The category id of the product
 *         typeId:
 *           type: integer
 *           description: The type id of the product
 *         image:
 *           type: string
 *           description: The image of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         minimumOrder:
 *           type: integer
 *           description: The minimum order quantity of the product
 *         unitPrice:
 *           type: integer
 *           description: The unit price of the product
 *         costPrice:
 *           type: integer
 *           description: The cost price of the product
 *         stock:
 *           type: integer
 *           description: The current stock quantity of the product
 *         weight:
 *           type: integer
 *           description: The weight of the product
 *         height:
 *           type: integer
 *           description: The height of the product
 *         width:
 *           type: integer
 *           description: The width of the product
 *         productOwnerId:
 *           type: integer
 *           description: The owner id of the product
 *         authorId:
 *           type: integer
 *           description: The author id of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp of the product
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp of the product
 *         categories:
 *           $ref: '#/components/schemas/ProductCategory'
 *         types:
 *           $ref: '#/components/schemas/ProductType'
 *         product_owners:
 *           $ref: '#/components/schemas/ProductOwner'
 *         authors:
 *           $ref: '#/components/schemas/WarehouseAdmin'
 *       example:
 *         - id: 2
 *           name: Product 2
 *           categoryId: 2
 *           typeId: 1
 *           image: images/KUCING2.jpg
 *           description: This is product 2 description.
 *           minimumOrder: 5
 *           unitPrice: 50000
 *           costPrice: 40000
 *           stock: 20
 *           weight: 300
 *           height: 8
 *           width: 4
 *           productOwnerId: 2
 *           authorId: 1
 *           createdAt: "2023-08-29T01:58:31.488Z"
 *           updatedAt: "2023-08-29T01:58:31.488Z"
 *           categories:
 *             id: 2
 *             name: Delivery Valve
 *             image: image_url_2
 *             createdAt: "2023-08-29T01:58:31.471Z"
 *             updatedAt: "2023-08-29T01:58:31.471Z"
 *           types:
 *             id: 1
 *             name: Type 1
 *             createdAt: "2023-08-29T01:58:31.468Z"
 *             updatedAt: "2023-08-29T01:58:31.468Z"
 *           product_owners:
 *             id: 2
 *             name: Juvindo
 *             address: 456 Oak Avenue
 *             phoneNumber: 555-5678
 *             paymentGatewayId: 102
 *             createdAt: "2023-08-29T01:58:31.477Z"
 *             updatedAt: "2023-08-29T01:58:31.477Z"
 *           authors:
 *             id: 1
 *             fullName: John Doe
 *             email: john.doe@example.com
 *             password: hashedpassword1
 *             role: warehouseAdmin
 *             createdAt: "2023-08-29T01:58:31.483Z"
 *             updatedAt: "2023-08-29T01:58:31.483Z"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/nozzle:
 *   get:
 *     summary: Returns a list of products in the "nozzle" category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products in the "nozzle" category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/delivery-valve:
 *   get:
 *     summary: Returns a list of products in the "Delivery Valve" category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products in the "Delivery Valve" category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/element:
 *   get:
 *     summary: Returns a list of products in the "Element" category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products in the "Element" category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/category/ve-pump:
 *   get:
 *     summary: Returns a list of products in the "VE Pump" category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products in the "VE Pump" category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/head-rotor:
 *   get:
 *     summary: Returns a list of products in the "Head Rotor" category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products in the "Head Rotor" category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/ve-pump-parts:
 *   get:
 *     summary: Returns a list of products in the "VE Pump Parts" category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products in the "VE Pump Parts" category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Returns a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: The retrieved product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               id:
 *                 type: integer
 *                 description: The auto-generated id of the product
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               categoryId:
 *                 type: integer
 *                 description: The category id of the product
 *               typeId:
 *                 type: integer
 *                 description: The type id of the product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               minimumOrder:
 *                 type: integer
 *                 description: The minimum order quantity of the product
 *               unitPrice:
 *                 type: integer
 *                 description: The unit price of the product
 *               costPrice:
 *                 type: integer
 *                 description: The cost price of the product
 *               stock:
 *                 type: integer
 *                 description: The current stock quantity of the product
 *               weight:
 *                 type: integer
 *                 description: The weight of the product
 *               height:
 *                 type: integer
 *                 description: The height of the product
 *               width:
 *                 type: integer
 *                 description: The width of the product
 *               productOwnerId:
 *                 type: integer
 *                 description: The owner id of the product
 *               authorId:
 *                 type: integer
 *                 description: The author id of the product
 *     responses:
 *       201:
 *         description: The newly added product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to delete
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */


module.exports = router