const IncomeController = require("../controllers/income.controller");
const { incomeSchema } = require("../validationSchemas/income.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
    app.route("/api/income").post(authenticator, validator(incomeSchema), IncomeController.create);
    app.route("/api/income/:id").put(authenticator, IncomeController.update);
    app.route("/api/income").get(authenticator, IncomeController.findAll);
    app.route("/api/income/:id").get(authenticator, IncomeController.findById);
    app.route("/api/income/:id").delete(authenticator, IncomeController.delete);
};