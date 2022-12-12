const UserRoute = require("./userRoutes");
const RoleRoute = require("./roleRoutes");
const PriviledgeRoute = require("./priviledgeRoutes");
const ModuleRoute = require("./moduleRoutes");

exports.initRoutes = (app) => {
  UserRoute(app);
  RoleRoute(app);
  PriviledgeRoute(app);
  ModuleRoute(app);

};
