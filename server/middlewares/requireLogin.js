const mongoose = require("mongoose");
const SessionModel = mongoose.model("sessions");

module.exports = async (req, res, next) => {
  console.log(req.cookies);
  const data = await SessionModel.findById(req.cookies["session_id"]);
  console.log(req.cookies.session_id);
  console.log("Inside require login");
  console.log(data);
  if (!data || !data.token) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }
  req.token = data.token;
  return next();
};
