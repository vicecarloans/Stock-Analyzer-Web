const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const SessionModel = mongoose.model("sessions");

router.post("/signin", async (req, res, next) => {
  try {
    const body = { ...req.body };
    const { data } = await axios.post(
      "https://stock-analyzer-api.herokuapp.com/api/auth/signin",
      JSON.stringify(body),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const session = new SessionModel({
      token: data.token
    });
    const result = await session.save();
    res.cookie("session_id", result._id, {
      maxAge: 3600000,
      httpOnly: true
    });

    return res.json({ status: 1, message: "User signed in successfully" });
  } catch (err) {
    next(new Error({ status: 400, message: "Wrong email/password" }));
  }
});

router.get("/signout", (req, res, next) => {
  res.clearCookie("session_id");
  return res.redirect("/login");
});

module.exports = router;
