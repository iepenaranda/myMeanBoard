const express = require("express");
const router = express.Router();
const Role = require("../models/role");
const Auth = require("../middleware/auth");
const Exist = require("../middleware/userExist");

// registro de roles nuevos
router.post("/newRole", async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data.");

  let role = await Role.findOne({ name: req.body.name });
  if (role)
    return res
      .status(401)
      .send("The role " + req.body.name + " already exists.");

  role = new Role({
    name: req.body.name,
    description: req.body.description,
  });

  const result = await role.save();
  if (!result)
    res.status(401).send("the role " + req.body.name + " was not saved.");
  return res.status(200).send({ result });
});

// listar roles
router.get("/listRoles", async (req, res) => {
  const role = await Role.find();
  if (!role) return res.status(401).send("No roles were found.");
  return res.status(200).send({ role });
});


module.exports = router;