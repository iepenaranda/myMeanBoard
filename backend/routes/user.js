const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Registro de usuario nuevo
router.post("/newUser", async (req, res) => {
  // Verificamos que el correo no este registrado.
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("El usuario ya existe.");

  const hash = await bcrypt.hash(req.body.password, 8);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  const result = await user.save();

  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("No se ha podido registrar el usuario");
  }
});

module.exports = router;
