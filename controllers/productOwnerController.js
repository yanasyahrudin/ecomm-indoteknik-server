const { ProductOwner } = require("../models");

class ProductOwnerController {
  static async getAllProductOwners(req, res, next) {
    try {
      const productOwners = await ProductOwner.findAll();
      res.status(200).json(productOwners);
    } catch (error) {
      next(error);
    }
  }

  static async addProductOwner(req, res, next) {
    try {
      const newProductOwner = await ProductOwner.create({
        ...req.body,
      });
      res.status(201).json({ status: "success", data: newProductOwner });
    } catch (error) {
      next(error);
    }
  }

  static async detailsProductOwner(req, res, next) {
    try {
      const productOwner = await ProductOwner.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (productOwner) {
        res.status(200).json(productOwner);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductOwner(req, res, next) {
    try {
      const productOwner = await ProductOwner.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (productOwner) {
        await ProductOwner.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Product Owner successfully deleted" });
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async editProductOwner(req, res, next) {
    try {
      const productOwnerId = req.params.id;

      await ProductOwner.update(
        {
          ...req.body,
        },
        {
          where: {
            id: productOwnerId,
          },
        }
      );
      res.status(201).json({ message: "Product owner successfully edited" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductOwnerController;
