const { compare } = require("../helpers/bcryptjs");
const { Driver } = require("../models");
const { createToken } = require("../helpers/jwt");

class DriverController {
  static async registerDriver(req, res, next) {
    try {
      const { email, password, fullName, phoneNumber, address, imageProfile } =
        req.body;
      const driver = await Driver.create({
        email,
        password,
        fullName,
        role: "driver",
        phoneNumber,
        address,
        imageProfile,
      });
      res.status(201).json({ driver });
    } catch (error) {
      next(error);
    }
  }

  static async loginDriver(req, res, next) {
    try {
      const { email, password } = req.body;
      const driver = await Driver.findOne({
        where: { email },
      });
      if (!driver) {
        throw { name: "InvalidCredentials" };
      } else {
        const compareResult = compare(password, driver.password);
        if (!compareResult) {
          throw { name: "InvalidCredentials" };
        } else {
          const { id, email, role } = driver;
          let access_token = createToken({
            id,
            email,
            role,
          });
          res.status(200).json({
            access_token,
            fullName: driver.fullName,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DriverController;
