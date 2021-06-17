const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

module.exports = router;
