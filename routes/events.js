const express = require('express')
const { EventController } = require('../controllers/eventController')
const router = express.Router()

router.get('/', EventController.getAllEvents)
router.post('/', EventController.addEvent)
router.get('/:id', EventController.detailsEvent)
router.put('/:id', EventController.editEvent)
router.delete('/:id', EventController.deleteEvent)

module.exports = router