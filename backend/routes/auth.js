// ruta para realizar la autenticación de usuario
// importamos modulos
const express = require("express");
const router = express.Router();
// importamos el modelo de user
const User = require("../models/user");
// importamos bcrypt para decodificar la contraseña
const bcrypt = require("bcrypt");

// función login de usuario
router.post("/login", async (req, res) => {
  // buscamos el correo en la BD
  const user = await User.findOne({ email: req.body.email });

  // verificamos que la busqueda dio resultados
  // 1. en caso de que no haya encontrado el correo
  if (!user) return res.status(400).send("Email o contraseña son incorrectos.");

  // 2. en caso de que haya encontrado el correo, comprobar el password
  // bcrypt posee un metodo llamado compare que permite comparar claves encriptadas con texto normal, si son iguales retorna True, en caso contrario retorna False.
  const hash = await bcrypt.compare(req.body.password, user.password);

  // 2.1 en caso de que no sean iguales
  if (!hash) return res.status(400).send("Email o contraseña son incorrectos.");

  // 2.2 en caso de que la contraseña  sea correcta devolvemos un token
  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});
// se exporta el modulo
module.exports = router;
