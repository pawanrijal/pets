const roleController = require("../controllers/roleController");
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");
module.exports = (app) => {
    app.route("/api/role").post(passport.authenticate("jwt", { session: false }),authorize, roleController.create);
    app.route("/api/role/:id").put( passport.authenticate("jwt", { session: false }),authorize,roleController.update);
    app.route("/api/role").get(passport.authenticate("jwt", { session: false }),authorize,roleController.findAll);
    app.route("/api/role/:id").get(passport.authenticate("jwt", { session: false }),authorize,roleController.findById);
    app.route("/api/role/:id").delete(passport.authenticate("jwt", { session: false }),authorize,roleController.delete);
    app.route("/api/role/assignRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.assignRoleToUser);
    app.route("/api/role/removeRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.removeRoleToUser)
    app.route("/api/role/addAccessToRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.addAccessToRole)
    app.route("/api/role/removeAccessToRole").post(passport.authenticate("jwt", { session: false }),authorize,roleController.removeAccessFromRole)
};