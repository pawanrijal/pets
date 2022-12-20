const PartyController = require("../controllers/party.controller");
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");
const { partySchema } = require("../validationSchemas/partyValidationSchema");
const validator = require("../middleware/validationMiddleware");
module.exports = (app) => {
    app.route("/api/party").post(passport.authenticate("jwt", { session: false }),validator(partySchema),authorize, PartyController.create);
    app.route("/api/party").put( passport.authenticate("jwt", { session: false }),authorize,PartyController.update);
    app.route("/api/party").get(passport.authenticate("jwt", { session: false }),authorize,PartyController.findAll);
    app.route("/api/party").get(passport.authenticate("jwt", { session: false }),authorize,PartyController.findById);
    app.route("/api/party").delete(passport.authenticate("jwt", { session: false }),authorize,PartyController.delete);
};