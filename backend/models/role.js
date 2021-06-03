const mongoose = require("mongoose");
const moment = require("moment");

const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: {type: Boolean, default: true},
  date: { type: Date, default: Date.now },
});

const role = mongoose.model("roles", roleSchema);
module.exports = role;