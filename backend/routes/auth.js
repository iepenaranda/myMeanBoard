const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Auth = require("../middleware/auth")
const Role = require("../models/role");

router.post("/login", async (req, res) => {
  // Verificamos el correo
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Error: Email or password are incorrect");

  // Verificamos la contraseña
  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("Error: Email or password are incorrect");

  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

// Verificamos que el usuario sea un Admin
router.get("/admin", Auth, async (req, res) => {
  const roleName = await Role.findById(req.user.roleId);
  if (roleName.name === "admin") return res.status(200).send({ admin: true });
  return res.status(200).send({ admin: false });
});

module.exports = router;
