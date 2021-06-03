const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: {type: mongoose.Schema.ObjectId, ref: "roles"},
  status: Boolean,
  date: { type: Date, 
    default: Date.now },
});

// Firma de JWT para el envío de información dentro de la app
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY
  );
};

// Instancia de usuario que será exportada
const User = mongoose.model("user", userSchema);
module.exports = User;