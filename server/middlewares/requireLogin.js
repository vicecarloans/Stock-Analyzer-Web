const mongoose = require("mongoose");
const SessionModel = mongoose.model("sessions");

module.exports = async (req, res, next) => {
  if (!req.cookies || !req.cookies.session_id) {
    const error = new Error("Unauthorized");
    error.status = 401;
    next(error);
  }
  const { token } = await SessionModel.findById(req.cookies.session_id);
  req.token = token;
  next();
};
