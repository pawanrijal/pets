const ChartController = require("../controllers/chart.controller");
const authenticator = require("../middleware/authentication.middleware");
module.exports = (app) => {
    app.route("/api/chart").get(authenticator, ChartController.chart);
};