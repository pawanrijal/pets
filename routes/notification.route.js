const NotificationController = require("../controllers/notification.controller");
const authenticator = require("../middleware/authentication.middleware");
module.exports = (app) => {
    app.route("/api/notification").get(authenticator, NotificationController.findAll);
    app.route("/api/notification/:id").get(authenticator, NotificationController.findById);
};