// Este middleware verifica la sesión del usuario
const jwt = require("jsonwebtoken");

// validamos el token del usuario
const auth = (req, res, next) => {
    // Verificamos la existencia del token
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(400).send("Autorización rechazada: el token no existe.");

    // Token de la forma "Bearer xxx.yyy.zzz"
    jwtToken = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(400).send("Autorización rechaza: el token no existe.");

    // verify arroja un error en caso de que no pueda verificar el token
    try {
        const payload = jwt.verify(jwtToken, "secretKey");
        req.user = payload;
        next()
    } catch (error) {
        return res.status(400).send("Autorización rechazada: Token inválido.")
    }
};

module.exports = auth;