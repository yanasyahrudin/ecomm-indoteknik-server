const { ProductType, ProductCategory } = require('../models')

class ProductTypeController {

    static async getAllProductType(req, res, next) {
        console.log(req.params, 'dari type');
        try {
            const productTypes = await ProductType.findAll({
                // include: [
                //     {
                //         model: ProductCategory,
                //         as: 'product_categories'
                //     }
                // ]
            })
            res.status(200).json(productTypes)
        } catch (error) {
            next(error)
        }
    }

    static async addProductType(req, res, next) {
        try {
            const newProductType = await ProductType.create({
                name: req.body.name
            })
            res.status(201).json(newProductType)
        } catch (error) {
            next(error)
        }
    }

    static async detailsProductType(req, res, next) {
        try {
            const productTypes = await ProductType.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (productTypes) {
                res.status(200).json(productTypes)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductType(req, res, next) {
        try {
            const productType = await ProductType.findOne({
                where: { id: req.params.id }
            })
            if (productType) {
                await ProductType.destroy({
                    where: { id: req.params.id }
                })
                res.status(200).json({ message: 'Type successfully deleted' })
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async editProductType(req, res, next) {
        try {
            const productTypeId = req.params.id
            const { name } = req.body
            await ProductType.update({
                name
            }, {
                where: {
                    id: productTypeId
                }
            })
            res.status(201).json({ message: 'Edit successful' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductTypeController