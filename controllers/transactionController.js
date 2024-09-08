const { Transaction, User, Order, Product } = require("../models");

class TransactionController {
  static async getAllTransactions(req, res, next) {
    try {
      const transactions = await Transaction.findAll(
        {
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "fullName", "email", "address", "phoneNumber"],
            },
          ],
        },
        {
          model: Order,
          as: "orders",
          attributes: ["id", "qty", "totalPrice"],
          include: [
            {
              model: Product,
              as: "products",
              attributes: ["id", "title", "price", "image"],
            },
          ],
        }
      );
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  static async addTransaction(req, res, next) {
    try {
      const newTransaction = await Transaction.create({
        userId: req.body.userId,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        image: req.body.image,
      });
      res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }

  static async detailsTransactionUserId(req, res, next) {
    try {
      const transaction = await Transaction.findOne({
        where: {
          userId: req.params.userId,
        },
      });
      if (transaction) {
        res.status(200).json(transaction);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async detailsTransaction(req, res, next) {
    try {
      const transaction = await Transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (transaction) {
        res.status(200).json(transaction);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      Transaction.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((transaction) => {
        res.send({
          status: "success",
          data: {
            id: req.params.id,
          },
        });
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const transaction = await Transaction.findOne({
        where: { id: req.params.id },
      });
      if (transaction) {
        await Transaction.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Transaction successfully deleted" });
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
