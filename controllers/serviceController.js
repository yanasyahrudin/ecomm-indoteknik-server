const { Service } = require("../models");

class ServiceController {
  static async getAllServices(req, res, next) {
    try {
      const services = await Service.findAll();
      res.status(200).json(services);
    } catch (error) {
      next(error);
    }
  }

  static async addService(req, res, next) {
    try {
      const { image, title, description, duration, price } = req.body;

      const newService = await Service.create({
        image,
        title,
        description,
        duration,
        price,
      });
      res.status(201).json(newService);
    } catch (error) {
      next(error);
    }
  }

  static async detailsService(req, res, next) {
    try {
      const service = await Service.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (service) {
        res.status(200).json(service);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async editService(req, res, next) {
    try {
      const serviceId = req.params.id;
      const { image, title, description, duration, price } = req.body;

      await Service.update(
        {
          image,
          title,
          description,
          duration,
          price,
        },
        {
          where: {
            id: serviceId,
          },
        }
      );
      res.status(201).json({ message: "Edit successful" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      const service = await Service.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (service) {
        await Service.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Service successfully deleted" });
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;
