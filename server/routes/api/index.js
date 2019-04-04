const express = require("express");
const api = express.Router();

const userRoutes = require("./user");
const authRoutes = require("./auth");
const transactionRoutes = require("./transaction");
api.use("/user", userRoutes);
api.use("/auth", authRoutes);
api.use("/trans", transactionRoutes);

module.exports = api;
