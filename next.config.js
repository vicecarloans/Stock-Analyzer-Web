const images = require("./config/images");

module.exports = {
  ...images,
  publicRuntimeConfig: {
    IEXTRADING_PUBLISHABLE_TOKEN_STREAM:
      process.env.IEXTRADING_PUBLISHABLE_TOKEN_STREAM,
    IEXTRADING_PUBLISHABLE_TOKEN_API:
      process.env.IEXTRADING_PUBLISHABLE_TOKEN_API
  }
};
