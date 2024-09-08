const { Order, Product } = require("../models");

class OrderController {
  static async getAllOrders(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async addOrder(req, res, next) {
    try {
      let { id } = req.params;
      let findData = await Product.findByPk(id);
      if (!findData) {
        throw {
          message: "Not Found Product",
        };
      }
      let user_id = req.user.id;
      let createOrder = await Order.create({
        userId: user_id,
      });
      res.status(201).json(createOrder);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
