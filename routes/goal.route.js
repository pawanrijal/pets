const GoalController = require("../controllers/goal.controller");
const { goalSchema } = require("../validationSchemas/goal.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
    app.route("/api/goal").post(authenticator, validator(goalSchema), GoalController.create);
    app.route("/api/goal/:id").put(authenticator, GoalController.update);
    app.route("/api/goal").get(authenticator, GoalController.findAll);
    app.route("/api/goal/:id").get(authenticator, GoalController.findById);
    app.route("/api/goal/:id").delete(authenticator, GoalController.delete);
};