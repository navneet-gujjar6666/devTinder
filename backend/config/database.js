const mongoose = require("mongoose");
require("dotenv").config(); // load .env variables, //firstly do-(npm i dotenv) then after only this DB can connect to .env file

const connectDB = async (dbname) => {
  const uri = process.env.MONGO_URI.replace("mydbname", dbname); // replace placeholder with dbname
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
