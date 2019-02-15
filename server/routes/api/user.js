const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const SessionModel = mongoose.model("sessions");
const requireLogin = require("../../middlewares/requireLogin");

router.get("/", requireLogin, async (req, res, next) => {
  try {
    if (req.token) {
      const { data } = await axios.get(
        "https://stock-analyzer-api.herokuapp.com/api/user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + req.token
          }
        }
      );
      return res.json(data);
    }
    throw new Error({ status: 401, message: "No token found" });
  } catch (err) {
    throw new Error({ status: err.status, message: err.message });
  }
});

module.exports = router;
