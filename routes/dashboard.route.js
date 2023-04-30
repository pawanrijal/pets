const DashboardController = require("../controllers/dashboard.controller");
const authenticator = require("../middleware/authentication.middleware");
module.exports = (app) => {
  app.route("/api/dashboard").get(authenticator, DashboardController.getData);
};
