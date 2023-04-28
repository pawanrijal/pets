const PartyController = require("../controllers/party.controller");
const { partySchema } = require("../validationSchemas/party.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
    app.route("/api/party").post(authenticator, validator(partySchema), PartyController.create);
    app.route("/api/party/:id").put(authenticator, PartyController.update);
    app.route("/api/party").get(authenticator, PartyController.findAll);
    app.route("/api/party/:id").get(authenticator, PartyController.findById);
    app.route("/api/party/:id").delete(authenticator, PartyController.delete);
};