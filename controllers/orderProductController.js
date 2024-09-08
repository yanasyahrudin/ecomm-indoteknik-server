const { OrderProduct } = require("../models");

class OrderProductController {
  static async getAllOrderProducts(req, res, next) {
    try {
      const orderProduct = await OrderProduct.findAll();
      res.status(200).json(orderProduct);
    } catch (error) {
      next(error);
    }
  }

  static async addOrderProduct(req, res, next) {
    try {
      const { orderId, productId } = req.body;
      const newOrderProduct = await OrderProduct.create({ orderId, productId });
      res.status(201).json(newOrderProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderProductController;
