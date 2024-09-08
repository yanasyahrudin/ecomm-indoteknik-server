const { Product, ProductCategory, ProductType, User, SuperAdmin, ProductOwner, WarehouseAdmin, EventProduct } = require('../models')
const { validationResult } = require('express-validator')
const cloudinary = require('../helpers/cloudinary')
const baseUrl = 'https://indoteknikserver-732012365989.herokuapp.com'; // Ubah dengan URL server Anda

class ProductController {
    static async getAllProducts(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3, 82, 83, 191];

            const products = await Product.findAll(
                {
                    include: [
                        {
                            model: ProductCategory,
                            as: 'categories',
                        },
                        {
                            model: ProductType,
                            as: 'types'
                        },
                        {
                            model: ProductOwner,
                            as: 'product_owners'
                        },
                        {
                            model: WarehouseAdmin,
                            as: 'authors'
                        },
                        {
                            model: EventProduct,
                            as: 'eventProducts'
                        }
                    ],
                }
            );
            const filteredProducts = products.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            console.log(error, 'form all product');
            next(error);
        }
    }

    static async getNozzelCategory(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3];
            const nozzle = await Product.findAll({
                where: { categoryId: 1 },
                order: [['createdAt', 'DESC']]
            })
            const filteredProducts = nozzle.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            next(error);
        }
    }
    static async getDeliveryValve(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3];
            const deliveryValve = await Product.findAll({
                where: { categoryId: 2 },
                order: [['createdAt', 'DESC']]
            })

            const filteredProducts = deliveryValve.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            next(error);
        }
    }

    static async getElementCategory(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3];
            const element = await Product.findAll({
                where: { categoryId: 3 },
                order: [['createdAt', 'DESC']]
            })
            const filteredProducts = element.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            next(error);
        }
    }

    static async getVEPumpCategory(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3];
            const vePump = await Product.findAll({
                where: { categoryId: 4 },
                order: [['createdAt', 'DESC']]
            })
            const filteredProducts = vePump.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            next(error);
        }
    }

    static async getVEPumpPartsCategory(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3];
            const vePumpParts = await Product.findAll({
                where: { categoryId: 5 },
                order: [['createdAt', 'DESC']]
            })
            const filteredProducts = vePumpParts.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            next(error);
        }
    }

    static async getHeadRotorCategory(req, res, next) {
        try {
            const hiddenProductIds = [1, 2, 3];
            const headRotor = await Product.findAll({
                where: { categoryId: 6 },
                order: [['createdAt', 'DESC']]
            })
            const filteredProducts = headRotor.filter(product => !hiddenProductIds.includes(product.id));
            res.status(200).json(filteredProducts);
        } catch (error) {
            next(error);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const err = new Error('Input values ​​dont match')
                err.errorStatus = 400
                err.data = errors.array()
                throw err
            }

            if (!req.file) {
                const err = new Error('Image must be uploaded')
                err.errorStatus = 422
                throw err
            }

            const folderName = 'product_images';

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: folderName
            })

            const newProduct = await Product.create({
                name: req.body.name,
                categoryId: req.body.categoryId,
                typeId: req.body.typeId,
                image: result.secure_url, // Use the secure URL provided by Cloudinary
                description: req.body.description,
                minimumOrder: req.body.minimumOrder,
                unitPrice: req.body.unitPrice,
                costPrice: req.body.costPrice,
                weight: req.body.weight,
                height: req.body.height,
                width: req.body.width,
                length: req.body.length,
                stock: req.body.stock,
                productOwnerId: req.body.productOwnerId,
                authorId: req.warehouseAdmin.id,
            })
            res.status(201).json({
                message: 'Product added successfully!',
                product: newProduct
            })
        } catch (error) {
            next(error)
        }
    }

    static async detailsProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: ProductCategory,
                        as: 'categories' // Nama asosiasi yang sama dengan yang didefinisikan di model Product
                    },
                    {
                        model: ProductType,
                        as: 'types'
                    },
                    {
                        model: ProductOwner,
                        as: 'product_owners'
                    },
                    {
                        model: WarehouseAdmin,
                        as: 'authors'
                    },
                ],
            })
            if (product) {
                res.status(200).json(product)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: { id: req.params.id }
            })
            if (product) {
                await Product.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Product successfully deleted' })
            } else {
                throw { name: 'NotFoundError' };
            }
        } catch (error) {
            next(error)
        }
    }

    static async editProduct(req, res, next) {
        try {
            const productId = req.params.id; // Get the product ID from the URL parameter
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = new Error('Input values ​​dont match');
                err.errorStatus = 400;
                err.data = errors.array();
                throw err;
            }

            const existingProduct = await Product.findByPk(productId);
            if (!existingProduct) {
                const err = new Error('Product not found');
                err.errorStatus = 404;
                throw err;
            }
            const folderName = 'product_images';

            // Cek apakah ada file yang diunggah
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: folderName
                });

                // Update path gambar jika ada file yang diunggah
                existingProduct.image = result.secure_url;
            }

            // Update the product's properties based on request body
            existingProduct.name = req.body.name;
            existingProduct.categoryId = req.body.categoryId;
            existingProduct.typeId = req.body.typeId;
            existingProduct.description = req.body.description;
            existingProduct.minimumOrder = req.body.minimumOrder;
            existingProduct.unitPrice = req.body.unitPrice;
            existingProduct.costPrice = req.body.costPricegit;
            existingProduct.weight = req.body.weight;
            existingProduct.height = req.body.height;
            existingProduct.width = req.body.width;
            existingProduct.length = req.body.length;
            existingProduct.stock = req.body.stock;
            existingProduct.authorId = req.warehouseAdmin.id;



            // Save the updated product
            await existingProduct.save();

            res.status(200).json(existingProduct);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

module.exports = ProductController