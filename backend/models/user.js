// importamos modulos
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// creamos el esquema de la coleccion user, "la forma que tendran los registros user"
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, 
    default: Date.now },
});

// Creamos la función generateJWT para los documents de user
// Esta función genera un JWT para el user.
// Un JWT es una forma segura de transmitir información
userSchema.methods.generateJWT = () => {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      iat: moment().unix(),
    },
    "secretKey"
  );
};

// creamos un modelo (document) usando el esquema establecido previamente
// el primer argumento de la función model determina el nombre de la coleccion en la cual se guardara este documento
const User = mongoose.model("user", userSchema);

// exportamos el modulo: el modelo creado será llamado por el archivo en la carpeta route, por lo tanto este archivo "exportara" la estructura creada (modelo)
module.exports = User;
