const mongoose = require("mongoose");
const SessionModel = mongoose.model("sessions");

module.exports = async (req, res, next) => {
  try {
    const data = await SessionModel.findById(req.cookies.session_id);
    if (!data.token) {
      const error = new Error("Unauthorized");
      error.status = 401;
      return next(error);
    }
    req.token = data.token;
    return next();
  } catch (err) {
    return next(new Error({ status: 500, message: err.message }));
  }
};
