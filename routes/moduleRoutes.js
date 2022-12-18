const moduleController = require("../controllers/moduleController");
const modulePriviledgeController = require("../controllers/modulePriviledgeConroller")
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");
module.exports = (app) => {
    app.route("/api/module").post(passport.authenticate("jwt", { session: false }), authorize, moduleController.create);
    app.route("/api/module/:id").put(passport.authenticate("jwt", { session: false }), authorize, moduleController.update);
    app.route("/api/module").get(passport.authenticate("jwt", { session: false }), authorize, moduleController.findAll);
    app.route("/api/module/:id").get(passport.authenticate("jwt", { session: false }), authorize, moduleController.findById);
    app.route("/api/module/:id").delete(passport.authenticate("jwt", { session: false }), authorize, moduleController.delete);
    app.route("/api/module/addPrivilege").post(passport.authenticate("jwt", { session: false }), authorize, modulePriviledgeController.addPrivilegeToModule)
    app.route("/api/module/removePrivilege").post(passport.authenticate("jwt", { session: false }), authorize, modulePriviledgeController.removePrivilegeFromModule)

};