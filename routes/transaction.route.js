const TransactionController = require("../controllers/transaction.controller");
const { transactionSchema } = require("../validationSchemas/transaction.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
    app.route("/api/transaction").post(authenticator, validator(transactionSchema), TransactionController.create);
    app.route("/api/transaction/amount").get(authenticator, TransactionController.amount);
    app.route("/api/transaction/:id").put(authenticator, TransactionController.update);
    app.route("/api/transaction").get(authenticator, TransactionController.findAll);
    app.route("/api/transaction/:id").get(authenticator, TransactionController.findById);
    app.route("/api/transaction/:id").delete(authenticator, TransactionController.delete);

};