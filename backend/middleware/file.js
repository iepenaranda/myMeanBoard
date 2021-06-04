const multer = require("multer");
const moment = require("moment");
const directory = "./uploads/";
const path = require("path");

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    filename = moment().unix() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/gif" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    )
      return cb(null, false);
    cb(null, true);
  },
});

module.exports = upload;