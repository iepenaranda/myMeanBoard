// Con auth se verificará la integridad de la sesión iniciada por el user por medio del JWT
// Se importa el modulo JWT
const jwt = require("jsonwebtoken");

// validamos la autentificación del token del usuario
const auth = (req, res, next) => {
    // el JWT que toca verificar se encuentra en el header del request recibido, en el bloque de Authorization
    let jwtToken = req.header("Authorization");
    // validamos si existe el JWT
    // 1. Si no existe el JWT
    if(!jwtToken) return res.status(400).send("Autorización rechazada: el token no existe.");

    // 2. El token vendra en el request de la forma "Bearer xxx.yyy.zzz", por lo tanto toca separar el token del "Bearer"
    jwtToken = jwtToken.split(" ")[1];
    // 2.1 verificamos la existencia del token nuevamente
    if(!jwtToken) return res.status(400).send("Autorización rechaza: el token no existe.");

    // 2.2 verify retorna el payload del JWT con la key proporcionada. En caso contrario dará error
    try {
        const payload = jwt.verify(jwtToken, "secretKey");
        // finalmente se asigna el payload al req.user para que pueda continuar con la sesion
        req.user = payload;
        next()
    } catch (error) {
        return res.status(400).send("Autorización rechazada: Token inválido.")
    }
};

// exportamos el modulo
module.exports = auth;