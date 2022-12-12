const moduleController = require("../controllers/moduleController");
const modulePriviledgeController = require("../controllers/modulePriviledgeConroller")
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");
module.exports = (app) => {
    app
        .route("/module")
        .post(passport.authenticate("jwt", { session: false }), authorize,
            moduleController.create
        ),
        app.route("/module/:id")
            .put(passport.authenticate("jwt", { session: false }), authorize, moduleController.update);
    app.route("/module").get(passport.authenticate("jwt", { session: false }), authorize, moduleController.findAll);
    app.route("/module/:id").get(passport.authenticate("jwt", { session: false }), authorize, moduleController.findById);
    app.route("/module/:id").delete(passport.authenticate("jwt", { session: false }), authorize, moduleController.delete);
    app.route("/module/addPrivilege").post(passport.authenticate("jwt", { session: false }), authorize, modulePriviledgeController.addPrivilegeToModule)
    app.route("/module/removePrivilege").post(passport.authenticate("jwt", { session: false }), authorize, modulePriviledgeController.removePrivilegeFromModule)

};