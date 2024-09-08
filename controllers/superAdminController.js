const { compare } = require('../helpers/bcryptjs');
const { SuperAdmin, CheckoutProduct, Checkout, Product, ProductOwner } = require('../models')
const { createToken } = require('../helpers/jwt')

class SuperAdminController {

    static async registerSuperAdmin(req, res, next) {
        try {
            const {
                email,
                password,
                fullName,
                phoneNumber,
                address,
                imageProfile
            } = req.body
            const superAdmin = await SuperAdmin.create({
                email,
                password,
                fullName,
                role: 'superAdmin',
                phoneNumber,
                address,
                imageProfile
            })
            res.status(201).json({ superAdmin })
        } catch (error) {
            next(error)
        }
    }

    static async loginSuperAdmin(req, res, next) {
        try {
            const { email, password } = req.body
            const superAdmin = await SuperAdmin.findOne({
                where: { email }
            })
            if (!superAdmin) {
                throw { name: 'InvalidCredentials' }
            } else {
                const compareResult = compare(password, superAdmin.password)
                if (!compareResult) {
                    throw { name: 'InvalidCredentials' }
                } else {
                    const { id, email, role } = superAdmin
                    const access_token = createToken({
                        id, email, role
                    })
                    res.status(200).json({
                        access_token, fullName: superAdmin.fullName
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async getAllTransactions(req, res, next) {
        try {
            // Find all checkouts
            const checkouts = await Checkout.findAll();
    
            const checkoutProductsMap = {};
    
            // Iterate through all checkouts
            for (const checkout of checkouts) {
                const checkoutId = checkout.id;
    
                // Retrieve checkout products and include associated product data
                const checkoutProducts = await CheckoutProduct.findAll({
                    where: {
                        checkoutId: checkoutId
                    },
                    include: [
                        {
                            model: Product,
                            as: 'products',
                            include: [
                                {
                                    model: ProductOwner,
                                    as: 'product_owners'
                                }
                            ]
                        },
                        {
                            model: Checkout,
                            as: 'checkouts'
                        }
                    ],
                    order: [['createdAt', 'ASC']]
                });
    
                if (checkoutProducts.length > 0) {
                    // Store checkout products with quantity in the map
                    checkoutProductsMap[checkoutId] = checkoutProducts.map(cp => ({
                        product: cp.products,
                        checkout: cp.checkouts,
                        quantity: cp.quantity,
                        createdAt: cp.createdAt
                    }));
                }
            }
    
            res.status(200).json(checkoutProductsMap);
        } catch (error) {
            next(error);
        }
    }
    


}

module.exports = SuperAdminController