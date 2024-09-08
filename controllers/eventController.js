const { Event, EventProduct, Product } = require('../models')
class EventController {

    static async getAllEvents(req, res, next) {
        try {
            const events = await Event.findAll({
            })
            res.status(200).json(events)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addEvent(req, res, next) {
        try {
            const {
                name,
                description,
                startDate,
                endDate
            } = req.body

            const newEvent = await Event.create({
                name,
                description,
                startDate,
                endDate
            })
            res.status(201).json({
                message: 'Added event successfuly',
                event: newEvent
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async detailsEvent(req, res, next) {
        try {
            const event = await Event.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (event) {
                res.status(200).json(event)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async editEvent(req, res, next) {
        try {
            const eventId = req.params.id
            const {
                name,
                description,
                startDate,
                endDate
            } = req.body

            await Event.update({
                name,
                description,
                startDate,
                endDate
            },
                {
                    where: {
                        id: eventId
                    }
                })
            res.status(201).json({
                message: 'Edit successful'
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteEvent(req, res, next) {
        try {
            const event = await Event.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (event) {
                await Event.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Event successfully deleted' })
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { EventController }