// importamos los modulos
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// registrar usuario nuevo, method=POST
// las "rutas" requieren los URI para indicar su "ubicacion" y el metodo HTTP que van a usar
router.post("/newUser", async (req, res) => {
  // verificamos que el correo recibido no exista en la BD
  let user = await User.findOne({ email: req.body.email });

  // 1. si el correo ya esta registrado:
  if (user) return res.status(400).send("El usuario ya existe.");

  // 2. si no esta registrado
  // 2.1 encriptamos la contraseña recibida
  const hash = await bcrypt.hash(req.body.password, 8);

  // 2.2 guardamos los datos del usuario
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  // 2.3 guardamos el usuario en la BD
  const result = await user.save();

  if (result) {
    // 2.3.1 si es almacenado exitosamente, se genera un JWT para ese usuario
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    // 2.3.2 si no se almacena el dato
    return res.status(400).send("No se ha podido registrar el usuario");
  }
});

// exportamos el objeto router creado
module.exports = router;
