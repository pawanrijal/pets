const FinanceController = require("../controllers/finance.controller");
const { financeSchema } = require("../validationSchemas/finance.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
  app
    .route("/api/finance")
    .post(authenticator, validator(financeSchema), FinanceController.create);
  app.route("/api/finance/:id").put(authenticator, FinanceController.update);
  app.route("/api/finance").get(authenticator, FinanceController.findAll);
  app.route("/api/finance/:id").get(authenticator, FinanceController.findById);
  app.route("/api/finance/:id").delete(authenticator, FinanceController.delete);
  app
    .route("/api/finance/trend/:month")
    .get(authenticator, FinanceController.calculateTrend);
};
