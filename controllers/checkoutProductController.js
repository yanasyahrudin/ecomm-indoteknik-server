const { CheckoutProduct, Checkout, Product, ProductOwner, sequelize, User } = require('../models')

class CheckoutProductController {

    static async getAllCheckoutProducts(req, res, next) {

        try {
            // Find checkouts associated with the user
            const checkouts = await Checkout.findAll({
                where: { userId: req.user.id },
            });

            const checkoutProductsMap = {};

            // Iterate through checkouts
            for (const checkout of checkouts) {
                const checkoutId = checkout.id;

                // Retrieve checkout products and include associated product data
                const checkoutProducts = await CheckoutProduct.findAll({
                    where: {
                        checkoutId: checkoutId
                    },
                    include: [
                        {
                            model: Product,   // Include Product model
                            as: 'products',    // Define alias for the association,
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

                // Filter checkout products by paymentStatus
                const paidCheckoutProducts = checkoutProducts.filter(cp => cp.checkouts.paymentStatus === 'dibayar');
                

                if (paidCheckoutProducts.length > 0) {
                    // Store checkout products with quantity in the map
                    checkoutProductsMap[checkoutId] = paidCheckoutProducts.map(cp => ({
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


    static async addCheckoutProduct(req, res, next) {
        const t = await sequelize.transaction();
        const { id } = req.body;
        try {
            let findedCheckout = await Checkout.findOne({ where: { userId: req.user.id } });
            let idTemp;
            if (!findedCheckout) {
                let cretedCheckout = await Checkout.create({ userId: req.user.id }, { transaction: t });
                idTemp = cretedCheckout.id;
            } else {
                idTemp = findedCheckout.id;
            }
            let checkCheckoutProduct = await CheckoutProduct.findOne({
                where: {
                    checkoutId: idTemp,
                    productId: id,
                },
            });

            if (checkCheckoutProduct) {
                await checkCheckoutProduct.increment("quantity", { by: 1, transaction: t });
            } else {
                await CheckoutProduct.create({
                    checkoutId: idTemp,
                    productId: id,
                    quantity: 1,
                }, { transaction: t });
            }

            let findedProduct = await Product.findOne({ where: { id } });
            await findedProduct.decrement("stock", { by: 1, transaction: t });
        } catch (error) {
            console.log(error);
        }

    }

    static async detailsCheckoutProduct(req, res, next) {
        try {
            const checkoutId = req.params.id; // Assuming checkoutId is passed as a parameter

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
                        as: 'checkouts',
                        include: [
                            {
                                model: User,
                                as: 'users'
                            }
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            if (checkoutProducts.length === 0) {
                return res.status(404).json({ message: 'Checkout products not found.' });
            }

            const formattedCheckoutProducts = checkoutProducts.map(cp => ({
                product: cp.products,
                checkout: cp.checkouts,
                quantity: cp.quantity,
                createdAt: cp.createdAt
            }));
            res.status(200).json(formattedCheckoutProducts);
        } catch (error) {
            next(error);
        }
    }




}

module.exports = CheckoutProductController;
