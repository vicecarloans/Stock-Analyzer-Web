const routes = require("next-routes");

// param-1 : name of the route
// param-2 : url regex
// param-3 : pages name
module.exports = routes()
  .add("login")
  .add("register")
  .add("forgotPassword")
  .add("dashboard")
  .add("news")
  .add("portfolio")
  .add("profile");
