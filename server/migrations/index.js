const mongoose = require("mongoose");

module.exports = () => {
  require("./sessions");
  mongoose.connect(
    "mongodb://huydam:secret123@ds135305.mlab.com:35305/stock-analyzer-web"
  );
  mongoose.connection.on("error", error => console.log(error));
};
