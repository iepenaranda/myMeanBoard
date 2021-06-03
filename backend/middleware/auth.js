// Este middleware verifica la sesión del usuario

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Obtenemos el token
  let jwtToken = req.header("Authorization");
  if (!jwtToken)
    return res.status(400).send("Autorización rechazada: el token no existe.");

  // Token de la forma "Bearer xxx.yyy.zzz"
  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken)
    return res.status(400).send("Autorización rechaza: el token no existe.");

  try {
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send("Autorización rechazada: Token inválido.");
  }
};

module.exports = auth;