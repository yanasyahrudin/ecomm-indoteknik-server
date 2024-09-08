const { Profile, User } = require("../models");

class ProfileController {
  static async getProfileByUserId(req, res, next) {
    try {
      const profiles = await Profile.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            as: "user",
          },
        ],
      });
      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async addProfile(req, res, next) {
    try {
      const { phoneNumber, gender, address, postalCode } = req.body;

      const profile = await Profile.create({
        userId: req.user.id,
        phoneNumber,
        gender,
        address,
        postalCode,
      });
      res.status(201).json({ status: "success", data: profile });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      Profile.update(
        {
          ...req.body,
        },
        {
          where: {
            userId: req.params.id,
          },
        }
      ).then((profile) => {
        res.send({
          status: "success",
          data: profile,
        });
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = ProfileController;
