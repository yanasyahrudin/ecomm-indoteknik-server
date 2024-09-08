const { Appointment } = require("../models");

class AppointmentController {
  static async getAllAppointments(req, res, next) {
    try {
      const appointments = await Appointment.findAll();
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }

  static async addAppointment(req, res, next) {
    try {
      const newAppointment = await Appointment.create({
        title: req.body.title,
        timeSchedule: req.body.timeSchedule,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        image: req.body.image,
      });
      res.status(201).json(newAppointment);
    } catch (error) {
      next(error);
    }
  }

  static async detailsAppointment(req, res, next) {
    try {
      const appointment = await Appointment.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async editAppointment(req, res, next) {
    try {
      const appointmentId = req.params.id;
      const { title, timeSchedule, fullName, phoneNumber, image } = req.body;

      await Appointment.update(
        {
          title,
          timeSchedule,
          fullName,
          phoneNumber,
          image,
        },
        {
          where: {
            id: appointmentId,
          },
        }
      );
      res.status(201).json({ message: "Appointment successfully updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAppointment(req, res, next) {
    try {
      const appointment = await Appointment.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (appointment) {
        await Appointment.destroy({ where: { id: req.params.id } });
        res.status(200).json(appointment);
      } else {
        throw { name: "NotFoundErrorAppointment" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AppointmentController;
