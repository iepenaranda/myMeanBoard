const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Role = require("../models/role");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Auth = require("../middleware/auth");
const Exist = require("../middleware/userExist");
const Admin = require("../middleware/admin");

// Registro de usuario nuevo
router.post("/newUser", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(401).send("Incomplete data.");

  // Verificamos que el correo no este registrado.
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user already exists");

  let role = await Role.findOne({ name: "user" });
  if (!role) return res.status(400).send("The user's role was not assigned.");

  // Guardamos el usuario en BD
  const hash = await bcrypt.hash(req.body.password, 8);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    active: true,
  });
  const result = await user.save();

  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("User was not registered.");
  }
});

// Registrar admin
router.post("/newAdmin", Auth, Exist, Admin, async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.roleId)
    return res.status(401).send("Incomplete data.");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user already exists");

  const role = await Role.findOne({ _id: req.body.roleId});
  if (!role) return res.status(400).send("Invalid id.");

  const hash = await bcrypt.hash(req.body.password, 8);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    active: true,
  });
  const result = await user.save();

  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Admin was not registered.");
  }
})

// Listar usuarios
router.get("/listUsers/:name?", Auth, Exist, Admin, async (req, res) => {
  const users = await User.find({
    name: { $regex: "(" + req.params["name"] + ").*", $options: "i" },
  })
    .populate("roleId")
    .exec();
  if (!users)
    return res
      .status(400)
      .send("There are no users that match with the search.");
  return res.status(200).send({ users });
});

router.update("/updateUser", Auth, Exist, Admin, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId ||
    !req.body._id
  )
    return res.status(400).send("Data incomplete");

  const hash = await bcrypt.hash(req.body.password, 8);

  const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    active: true,
  });

  if (!user) return res.status(401).send("The user was not updated.");
  return res.status(200).send({ user });
});

// Eliminar usuario por id
router.delete("/deleteUser/:_id", Auth, Exist, Admin, async (req, res) => {
  if (!req.params._id) return res.status(400).send("There is not id.");

  const user = await User.findByIdAndDelete(req.params._id);
  if (!user) return res.status(401).send("Could not delete the user.");
  return res.status(200).send("The user was deleted.");
});

// Eliminar usuario por status
router.update("/deleteUser", Auth, Exist, Admin, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId ||
    !req.body._id
  )
    return res.status(400).send("Can not delete user: data incomplete");

  const hash = await bcrypt.hash(req.body.password, 8);

  const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    active: false,
  });

  if (!user) return res.status(401).send("The user was deleted.");
  return res.status(200).send({ user });
});

module.exports = router;