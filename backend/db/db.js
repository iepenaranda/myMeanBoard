const mongoose = require("mongoose");

const dbConnection = async () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("Connection with MongoDB: ON"))
    .catch((err) => console.log("Error connection with MongoDB: " + err))
};

module.exports = {dbConnection};