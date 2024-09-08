const { EventProduct, Product, Event, ProductCategory } = require('../models')

class EventProductController {

    static async getAllEventProducts(req, res, next) {
        try {
            const eventProducts = await EventProduct.findAll({
                include: [
                    {
                        model: Product,
                        as: 'eventProducts',
                        include: [
                            {
                                model: ProductCategory,
                                as: 'categories'
                            }
                        ]
                    },
                    {
                        model: Event,
                        as: 'events'
                    }
                ],
            })
            res.status(200).json(eventProducts)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addEventProduct(req, res, next) {
        try {
            const { eventId, productId } = req.body;

            // Check if Event and Product exist
            const event = await Event.findByPk(eventId);
            const product = await Product.findByPk(productId);

            if (!event || !product) {
                return res.status(404).json({ error: 'Event or Product not found' });
            }

            // Create EventProduct
            const newEventProduct = await EventProduct.create({ eventId, productId });

            return res.status(201).json({
                message: 'Added event product successfully',
                eventProduct: newEventProduct
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteEventProduct(req, res, next) {
        const id = req.params.id;
        try {
            const eventProduct = await EventProduct.findOne({ where: { id } });
            if (!eventProduct) {
                res.status(404).json({ message: "Product not found in event product" });
            }

            const product = await Product.findOne({
                where: { id: eventProduct.productId },
            });
            if (product) {

                await eventProduct.destroy();

                return res.status(200).json({ message: "Product removed from event product" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.log(error, "remooooove");
            next(error);
        }
    }

}

module.exports = { EventProductController }