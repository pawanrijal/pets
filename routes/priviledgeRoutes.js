const priviledgeController = require("../controllers/priviledgeController");
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");


module.exports = (app) => {
    app.route("/api/priviledge").post(passport.authenticate("jwt", { session: false }), authorize, priviledgeController.create);
    app.route("/api/priviledge/:id").put(passport.authenticate("jwt", { session: false }), authorize, priviledgeController.update);
    app.route("/api/priviledge").get(passport.authenticate("jwt", { session: false }), authorize, priviledgeController.findAll);
    app.route("/api/priviledge/:id").get(passport.authenticate("jwt", { session: false }), authorize, priviledgeController.findById);
    app.route("/api/priviledge/:id").delete(passport.authenticate("jwt", { session: false }), authorize, priviledgeController.delete);
};