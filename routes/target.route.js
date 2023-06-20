const TargetController = require("../controllers/target.controller");
const { targetSchema } = require("../validationSchemas/target.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
  app
    .route("/api/target")
    .post(authenticator, validator(targetSchema), TargetController.create);
  app.route("/api/target/:id").put(authenticator, TargetController.update);
  app.route("/api/target").get(authenticator, TargetController.findAll);
  app.route("/api/target/:id").get(authenticator, TargetController.findById);
  app.route("/api/target/:id").delete(authenticator, TargetController.delete);
};
