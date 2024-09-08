const { Ad } = require('../models')
class AdController {

    static async getAllAds(req, res, next) {
        try {
            const ads = await Ad.findAll()
            res.status(200).json(ads)
        } catch (error) {
            next(error)
            
        }
    }

    static async addAd(req, res, next) {
        try {
            const {
                image,
                price,
                duration,
                description,
            } = req.body

            const newAd = await Ad.create({
                image,
                price,
                duration,
                description
            })

            res.status(201).json(newAd)
        } catch (error) {
            next(error)
        }
    }

    static async detailsAd(req, res, next) {
        try {
            const ad = await Ad.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (ad) {
                res.status(200).json(ad)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteAd(req, res, next) {
        try {
            const ad = await Ad.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (ad) {
                await Ad.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Ad successfully deleted' })
            } else {
                throw { name: 'NotFoundErrorAd' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateAd(req, res, next) {
        try {
            const adId = req.params.id

            const {
                image,
                price,
                duration,
                description,
            } = req.body

            await Ad.update({
                image,
                price,
                duration,
                description
            }, {
                where: {
                    id: adId
                }
            })
            res.status(201).json({ message: 'ad successfully updated' })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = AdController