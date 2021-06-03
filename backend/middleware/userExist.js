const User = require("../models/user");

const registered = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(400)
      .send("Unauthenticated user: Please login.");
  next();
};

module.exports = registered;