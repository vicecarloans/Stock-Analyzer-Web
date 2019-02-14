const mongoose = require("mongoose");
const SessionModel = mongoose.model("sessions");

module.exports = async (req, res, next) => {
  try {
    const data = await SessionModel.findById(req.cookies.session_id);
    if (!data) {
      const error = new Error("Unauthorized");
      error.status = 401;
      next(error);
      return;
    }
    req.token = data.token;
    next();
  } catch (err) {
    next(new Error({ status: 500, message: err.message }));
  }
};
