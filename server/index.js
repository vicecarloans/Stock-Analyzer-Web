/*eslint-disable */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const next = require("next");
const cors = require("cors");
const axios = require("axios");
const uuidv4 = require("uuid/v4");

require("./migrations")();
const mongoose = require("mongoose");
const SessionModel = mongoose.model("sessions");
const requireLogin = require("./middlewares/requireLogin");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  return app.render(req, res, route.page, query);
});

app
  .prepare()
  .then(() => {
    const server = express();
    const corOptions = {
      origin: "http://localhost:4200",
      credentials: true,
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    server.use(cors(corOptions));
    server.use(
      cookieParser("secret", {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
    );
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));

    server.use("/api", require("./routes/api"));

    server.use(handler);

    server.use(function(err, req, res, next) {
      return res.status(err.status || 500).json({ error: err });
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
