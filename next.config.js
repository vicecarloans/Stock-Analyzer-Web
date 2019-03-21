const images = require("./config/images");

module.exports = {
  ...images,
  publicRuntimeConfig: {
    IEXTRADING_PUBLISHABLE_TOKEN: process.env.IEXTRADING_PUBLISHABLE_TOKEN
  }
};
