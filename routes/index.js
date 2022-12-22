const UserRoute = require("./user.route");
const PartyRoute=require("./party.route");

exports.initRoutes = (app) => {
  UserRoute(app);
  PartyRoute(app);
};
