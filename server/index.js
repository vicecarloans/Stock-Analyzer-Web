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

    server.post("/api/auth/signin", async (req, res, next) => {
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

    server.get("/api/user", requireLogin, async (req, res) => {
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
