const { compare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { WarehouseAdmin } = require("../models");

class WarehouseAdminController {
  static async getAllWarehouseAdmins(req, res, next) {
    try {
      const warehouseAdmins = await WarehouseAdmin.findAll();
      res.status(200).json(warehouseAdmins);
    } catch (error) {
      next(error);
    }
  }

  static async registerWarehouseAdmin(req, res, next) {
    try {
      let { email, password, fullName } = req.body;

      let warehouseAdmin = await WarehouseAdmin.create({
        email,
        password,
        fullName,
        role: "warehouseAdmin",
      });
      res.status(201).json({ warehouseAdmin });
    } catch (error) {
      next(error);
    }
  }

  static async loginWarehouseAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      let warehouseAdmin = await WarehouseAdmin.findOne({
        where: { email },
      });
      if (!warehouseAdmin) {
        throw { name: "InvalidCredentials" };
      } else {
        let compareResult = compare(password, warehouseAdmin.password);
        if (!compareResult) {
          throw { name: "InvalidCredentials" };
        } else {
          const { id, email, role } = warehouseAdmin;
          let access_token = createToken({
            id,
            email,
            role,
          });
          res.status(200).json({
            access_token,
            fullName: warehouseAdmin.fullName,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WarehouseAdminController;
