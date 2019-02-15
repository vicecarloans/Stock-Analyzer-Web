const mongoose = require("mongoose");
const { parsed: localEnv } = require("dotenv").config();

const MONGODB_URI = localEnv.MONGODB_URI || process.env.MONGODB_URI;
module.exports = () => {
  require("./sessions");
  mongoose.connect(MONGODB_URI);
  mongoose.connection.on("error", error => console.log(error));
};
