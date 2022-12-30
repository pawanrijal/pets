const UserRoute = require("./user.route");
const PartyRoute = require("./party.route");
const CategoryRoute = require("./category.route");

exports.initRoutes = (app) => {
  UserRoute(app);
  PartyRoute(app);
  CategoryRoute(app);
};
