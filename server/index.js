/*eslint-disable */
const express = require("express");
const proxy = require("express-http-proxy");
const routes = require("./routes");
const next = require("next");

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
    server.use(handler);
    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
