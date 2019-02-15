const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const { parsed: localEnv } = require("dotenv").config();
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
    next(new Error({ status: err.status, message: err.message }));
  }
});

router.put("/", requireLogin, async (req, res, next) => {
  try {
    if (req.token) {
      const { name, title, address } = req.body;
      const { data } = await axios.put(
        "https://stock-analyzer-api.herokuapp.com/api/user",
        JSON.stringify({
          name,
          title,
          address
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + req.token
          }
        }
      );
      return res.json({ data });
    }
  } catch (err) {
    next(new Error({ status: err.status, message: err.message }));
  }
});

const CLOUDINARY_API = localEnv.CLOUDINARY_API || process.env.CLOUDINARY_API;
const CLOUDINARY_NAME = localEnv.CLOUDINARY_NAME || process.env.CLOUDINARY_NAME;
const CLOUDINARY_SECRET =
  localEnv.CLOUDINARY_SECRET || process.env.CLOUDINARY_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "public",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const uploading = multer({ storage }).single("picture");

router.put("/picture", requireLogin, uploading, async (req, res, next) => {
  try {
    if (req.token) {
      const picture = req.file.url || "";
      if (req.file.url == null) {
        throw new Error({ status: 400, message: "Bad Request" });
      }
      const body = { picture };
      const { data } = await axios.put(
        "https://stock-analyzer-api.herokuapp.com/api/user/picture",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + req.token
          }
        }
      );
      return res.json({ data, picture });
    }
  } catch (err) {
    next(
      new Error({
        status: err.status,
        message: err.message
      })
    );
  }
});

module.exports = router;
