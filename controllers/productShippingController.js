const { ProductShipping } = require('../models')

class ProductShippingController {

    static async getAllProductShippings(req, res, next) {
        try {
            const productShipping = await ProductShipping.findAll()
            res.status(200).json(productShipping)
        } catch (error) {
            next(error)
        }
    }

    static async addProductShipping(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                contact,
                status,
                address,
                city,
                postalCode,
                userId,
                cartId
            } = req.body

            const newProductShipping = await ProductShipping.create({
                firstName,
                lastName,
                contact,
                status,
                address,
                city,
                postalCode,
                userId,
                cartId
            })
            res.status(201).json(newProductShipping)
        } catch (error) {
            next(error)
        }
    }

    static async detailsProductShipping(req, res, next) {
        try {
            const productShipping = await ProductShipping.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (productShipping) {
                res.status(200).json(productShipping)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async editProductShipping(req, res, next) {
        try {
            const productShippingId = req.params.id
            const {
                firstName,
                lastName,
                contact,
                status,
                address,
                city,
                postalCode,
                userId,
                cartId
            } = req.body

            await ProductShipping.update({
                firstName,
                lastName,
                contact,
                status,
                address,
                city,
                postalCode,
                userId,
                cartId
            },
                {
                    where: {
                        id: productShippingId
                    }
                })
            res.status(201).json({ message: 'Edit successful' })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductShipping(req, res, next) {
        try {
            const productShipping = await ProductShipping.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (productShipping) {
                await ProductShipping.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Product shipping successfully deleted' })
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductShippingController