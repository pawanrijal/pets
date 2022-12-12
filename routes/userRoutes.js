const UserController = require("../controllers/userController");
const { signupSchema,loginSchema } = require("../validationSchemas/userValidationSchema");
const validator = require("../middleware/validationMiddleware");

const passport = require("passport");
const authorize=require("../middleware/authorizationMiddleware")
const { upload } = require("../middleware/upload_middleware");

module.exports = (app) => {
  app
    .route("/user")
    .post(
      upload.single("profile_pic"),

      validator(signupSchema),
      UserController.create
    ),
    app
      .route("/user/:id")
      .put(passport.authenticate("jwt", { session: false }), UserController.update);
  app.route("/user").get(authorize,UserController.findAll);
  app.route("/user/:id").get(passport.authenticate("jwt", { session: false }),UserController.findById);
  app.route("/user/:id").delete(passport.authenticate("jwt", { session: false }),UserController.delete);
  app
    .route("/user/profile")
    .post(
      passport.authenticate("jwt", { session: false }),
      UserController.profile
    );
  app.route("/user/login").post(validator(loginSchema),UserController.login);
  app.route("/user/changePassword").post( passport.authenticate("jwt", { session: false }),authorize,UserController.changePassword)
};
