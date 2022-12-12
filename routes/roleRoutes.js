const roleController = require("../controllers/roleController");
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");
module.exports = (app) => {
    app
        .route("/role")
        .post(passport.authenticate("jwt", { session: false }),authorize,
            roleController.create
        ),
        app.route("/role/:id")
            .put( passport.authenticate("jwt", { session: false }),authorize,roleController.update);
    app.route("/role").get(passport.authenticate("jwt", { session: false }),authorize,roleController.findAll);
    app.route("/role/:id").get(passport.authenticate("jwt", { session: false }),authorize,roleController.findById);
    app.route("/role/:id").delete(passport.authenticate("jwt", { session: false }),authorize,roleController.delete);
    app.route("/role/assignRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.assignRoleToUser);
    app.route("/role/removeRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.removeRoleToUser)
    app.route("/role/addAccessToRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.addAccessToRole)
    app.route("/role/removeAccessToRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.removeAccessFromRole)

};