const { Wishlist, Product, User } = require('../models')

class WishlistController {

    static async getAllWishlists(req, res, next) {
        try {
            let user_id = req.user.id
            let wishlist = await Wishlist.findAll({
                include: [
                    {
                        model: Product,
                        as: 'product'
                    },
                    {
                        model: User,
                        as: 'user'
                    }
                ],
                where: {
                    userId: user_id
                }
            })
            if (!wishlist) {
                throw new Error(404, 'error not found')
            }
            res.status(200).json(wishlist)
        } catch (error) {
            next(error)
        }
    }

    static async addWishlist(req, res, next) {
        try {
            let { id } = req.params
            let findProduct = await Product.findByPk(id)
            if (!findProduct) {
                throw {
                    message: 'Not found product'
                }
            }
            let wishlist = await Wishlist.create({
                userId: req.user.id,
                productId: id
            })
            res.status(201).json(wishlist)
        } catch (error) {
            next(error)
        }
    }

    static async removeWishlist(req, res, next) {
        const id = req.params.id;
        try {
            const wishlist = await Wishlist.findOne({ where: { id } });
            if (!wishlist) {
                res.status(404).json({ message: "Product not found in wishlist" });
            }

            const product = await Product.findOne({
                where: { id: wishlist.productId },
            });
            if (product) {

                await wishlist.destroy();

                return res.status(200).json({ message: "Product removed from wishlist" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.log(error, "remooooove");
            next(error);
        }
    }
}

module.exports = WishlistController