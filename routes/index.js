const UserRoute = require("./userRoutes");
const PartyRoute=require("./party.route");

exports.initRoutes = (app) => {
  UserRoute(app);S
  PartyRoute(app);
};
