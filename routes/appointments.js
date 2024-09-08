const express = require('express')
const AppointmentController = require('../controllers/appointmentController')
const router = express.Router()

router.get('/', AppointmentController.getAllAppointments)
router.post('/', AppointmentController.addAppointment)
router.get('/:id', AppointmentController.detailsAppointment)
router.put('/:id', AppointmentController.editAppointment)
router.delete('/:id', AppointmentController.deleteAppointment)

module.exports = router