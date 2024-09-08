const { Voucher } = require("../models");

class VoucherController {
  static async getAllVouchers(req, res, next) {
    try {
      const vouchers = await Voucher.findAll();
      res.status(200).json(vouchers);
    } catch (error) {
      console.log(error);
    }
  }

  static async addVoucher(req, res, next) {
    try {
      const { image, discount, duration, description, voucherCode, authorId } =
        req.body;

      const newVoucher = await Voucher.create({
        image,
        discount,
        duration,
        voucherCode,
        description,
        authorId,
      });

      res.status(201).json(newVoucher);
    } catch (error) {
      next(error);
    }
  }

  static async detailsVoucher(req, res, next) {
    try {
      const voucher = await Voucher.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (voucher) {
        res.status(200).json(voucher);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteVoucher(req, res, next) {
    try {
      const voucher = await Voucher.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (voucher) {
        await Voucher.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Vocuher successfully deleted" });
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async editVoucher(req, res, next) {
    try {
      const voucherId = req.params.id;

      const { image, price, duration, description } = req.body;

      await Voucher.update(
        {
          image,
          price,
          duration,
          description,
        },
        {
          where: {
            id: voucherId,
          },
        }
      );
      res.status(201).json({ message: "Voucher successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VoucherController;
