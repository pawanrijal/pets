const priviledgeController = require("../controllers/priviledgeController");
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");


module.exports = (app) => {
    app
        .route("/priviledge")
        .post(passport.authenticate("jwt", { session: false }),authorize,
            priviledgeController.create
        ),
        app.route("/priviledge/:id")
            .put(passport.authenticate("jwt", { session: false }),authorize, priviledgeController.update);
    app.route("/priviledge").get(passport.authenticate("jwt", { session: false }),authorize,priviledgeController.findAll);
    app.route("/priviledge/:id").get(passport.authenticate("jwt", { session: false }),authorize,priviledgeController.findById);
    app.route("/priviledge/:id").delete(passport.authenticate("jwt", { session: false }),authorize,priviledgeController.delete);


};