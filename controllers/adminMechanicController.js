const { compare } = require("../helpers/bcryptjs");
const { AdminMechanic } = require("../models");
const { createToken } = require("../helpers/jwt");
const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync(10);

class AdminMechanicController {
  static async registerAdminMechanic(req, res, next) {
    try {
      const { email, password, fullName, phoneNumber, address, imageProfile } =
        req.body;
      const adminMechanic = await AdminMechanic.create({
        email,
        password,
        fullName,
        role: "adminMechanic",
        phoneNumber,
        address,
        imageProfile,
      });
      res.status(201).json({ adminMechanic });
    } catch (error) {
      next(error);
    }
  }

  static async loginAdminMechanic(req, res, next) {
    try {
      const { email, password } = req.body;
      const adminMechanic = await AdminMechanic.findOne({
        where: { email },
      });
      if (!adminMechanic) {
        throw { name: "InvalidCredentials" };
      } else {
        const compareResult = compare(password, adminMechanic.password);
        if (!compareResult) {
          throw { name: "InvalidCredentials" };
        } else {
          const { id, email, role } = AdminMechanic;
          let access_token = createToken({
            id,
            email,
            role,
          });
          res.status(200).json({
            access_token,
            fullName: adminMechanic.fullName,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateAdminMechanic(req, res, next) {
    try {
      if (req.body.password) {
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
      }
      let filename = null;
      try {
        filename = req.file.filename;
      } catch (error) {
        filename = req.body.imageProfile;
      }
      AdminMechanic.update(
        {
          email: req.body.email,
          password: req.body.password,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          imageProfile: filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((user) => {
        res.send({
          status: "success",
          data: {
            id: req.params.id,
          },
        });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminMechanicController;
