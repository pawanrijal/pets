const UserController = require("../controllers/userController");
const { signupSchema, loginSchema } = require("../validationSchemas/userValidationSchema");
const validator = require("../middleware/validationMiddleware");

const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware")
const { upload } = require("../middleware/upload_middleware");

module.exports = (app) => {
  app.route("/api/user/signup").post(upload.single("profile_pic"), validator(signupSchema), UserController.create);
  app.route("/api/user/:id").put(passport.authenticate("jwt", { session: false }), UserController.update);
  app.route("/api/users").get(authorize, UserController.findAll);
  // app.route("/api/user/:id").get(passport.authenticate("jwt", { session: false }), UserController.findById);
  app.route("/api/user/:id").delete(passport.authenticate("jwt", { session: false }), UserController.delete);
  app.route("/api/user").get(passport.authenticate("jwt", { session: false }), UserController.profile);
  app.route("/api/user/login").post(validator(loginSchema), UserController.login);
  app.route("/api/user/changePassword").post(passport.authenticate("jwt", { session: false }), authorize, UserController.changePassword)
};
