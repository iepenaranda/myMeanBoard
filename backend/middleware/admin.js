const Role = require("../models/role");

const admin = (req, res, next) => {
  const role = await Role.findById(req.user.roleId);
  if (!role) return res.status(401).send("Role does not exist.");

  if (role.name !== "admin")
    return res.status(401).send("You are nos authorized to access this option.");
  next();
};

module.exports = admin;
