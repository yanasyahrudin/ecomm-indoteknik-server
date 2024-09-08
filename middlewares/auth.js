const { verifyToken } = require("../helpers/jwt");
const {
  User,
  Product,
  SuperAdmin,
  AdminSeller,
  WarehouseAdmin,
} = require("../models");

async function authenticationUser(req, res, next) {
  try {
    let { access_token } = req.headers;
    let verify = verifyToken(access_token);
    let user = await User.findOne({
      where: { id: verify.id },
    });
    if (!user) {
      throw { name: "ForbiddenError" };
    }
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      purchasePoints: user.purchasePoints
    };
    next();
  } catch (error) {
    console.log(error, "dari middleware");
    next(error);
  }
}

async function authenticationWarehouseAdmin(req, res, next) {
  try {
    let { access_token } = req.headers;
    let verify = verifyToken(access_token);
    let warehouseAdmin = await WarehouseAdmin.findOne({
      where: { id: verify.id },
    });
    if (!warehouseAdmin) {
      throw { name: "ForbiddenError" };
    }
    req.warehouseAdmin = {
      id: warehouseAdmin.id,
      role: warehouseAdmin.role,
      email: warehouseAdmin.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const verify = verifyToken(access_token);

    const superAdmin = await SuperAdmin.findOne({
      where: { id: verify.id },
    });

    if (!superAdmin) {
      throw { name: "ForbiddenError" };
    }

    req.superAdmin = {
      id: superAdmin.id,
      role: superAdmin.role,
      email: superAdmin.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function authenticationAdminSeller(req, res, next) {
  try {
    const { access_token } = req.headers;
    const verify = verifyToken(access_token);
    const adminSeller = await AdminSeller.findOne({
      where: { id: verify.id },
    });

    if (!adminSeller) {
      throw { name: "ForbiddenError" };
    }
    req.adminSeller = {
      id: adminSeller.id,
      role: adminSeller.role,
      email: adminSeller.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    if (req.superAdmin.role === "superAdmin") {
      next();
    } else {
      throw { name: "ForbiddenError" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function authorizationAdminSeller(req, res, next) {
  try {
    if (req.adminSeller.role === "adminSeller") {
      next();
    } else {
      throw { name: "ForbiddenError" };
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationWarehouseAdmin(req, res, next) {
  try {
    if (req.warehouseAdmin.role === "warehouseAdmin") {
      next();
    } else {
      throw { name: "ForbiddenError" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorization,
  authenticationUser,
  authenticationAdminSeller,
  authorizationWarehouseAdmin,
  authorizationAdminSeller,
  authenticationWarehouseAdmin,
};
