const UserRoute = require("./user.route");
const PartyRoute = require("./party.route");
const CategoryRoute = require("./category.route");
const IncomeRoute=require("./income.route");

exports.initRoutes = (app) => {
  UserRoute(app);
  PartyRoute(app);
  CategoryRoute(app);
  IncomeRoute(app);
};
