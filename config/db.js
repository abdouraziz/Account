const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongooseURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("ConnectDB ...");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
