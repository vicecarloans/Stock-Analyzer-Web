const mongoose = require("mongoose");
const SessionModel = mongoose.model("sessions");

module.exports = async (req, res, next) => {
  const data = await SessionModel.findById(req.cookies["session_id"]);
  if (!data || !data.token) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }
  req.token = data.token;
  return next();
};
