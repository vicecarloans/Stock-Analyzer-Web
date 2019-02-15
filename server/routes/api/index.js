const express = require("express");
const api = express.Router();

const userRoutes = require("./user");
const authRoutes = require("./auth");
api.use("/user", userRoutes);
api.use("/auth", authRoutes);

module.exports = api;
