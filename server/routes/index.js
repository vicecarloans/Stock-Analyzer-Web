const routes = require("next-routes");

// param-1 : name of the route
// param-2 : url regex
// param-3 : pages name
module.exports = routes().add("about", "about/:id", "about");
