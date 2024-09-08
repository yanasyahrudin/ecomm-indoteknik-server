const { ProductCategory, ProductType, Product } = require('../models')
const { validationResult } = require('express-validator')
const cloudinary = require('../helpers/cloudinary')

class ProductCategoryController {

    static async addProductCategory(req, res, next) {
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

            const folderName = 'product_category_images';

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: folderName
            })

            const newCategory = await ProductCategory.create({
                name: req.body.name,
                image: result.secure_url,
            })
            res.status(201).json({
                message: 'Product Category added successfully!',
                category: newCategory
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllProductCategories(req, res, next) {
        try {
            const productCategories = await ProductCategory.findAll({
                include: [
                    {
                        model: Product,
                        as: 'categories'
                    }
                ]
            })
            res.status(200).json(productCategories)
        } catch (error) {
            console.log(error, 'test eror');
            next(error)
        }
    }


    static async detailsProductCategory(req, res, next) {
        try {
            const productCategory = await ProductCategory.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Product,
                        as: 'categories'
                    }
                ]
            })
            if (productCategory) {
                res.status(200).json(productCategory)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductCategory(req, res, next) {
        try {
            const productCategory = await ProductCategory.findOne({
                where: { id: req.params.id }
            })
            if (productCategory) {
                await ProductCategory.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Product category successfully deleted' })
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async editProductCategory(req, res, next) {
        try {
            const productCategoryId = req.params.id
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = new Error('Input values ​​dont match');
                err.errorStatus = 400;
                err.data = errors.array();
                throw err;
            }

            const existingProductCat = await ProductCategory.findByPk(productCategoryId);
            if (!existingProductCat) {
                const err = new Error('Product Category not found');
                err.errorStatus = 404;
                throw err;
            }
            const folderName = 'product_category_images';

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: folderName
                });

                // Update path gambar jika ada file yang diunggah
                existingProductCat.image = result.secure_url;
            }

            existingProductCat.name = req.body.name

            await existingProductCat.save();
            
            res.status(200).json({
                message: 'Edit product category successfully',
                category: existingProductCat
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductCategoryController