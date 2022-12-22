const UserController = require("../controllers/user.controller");
const { signupSchema, loginSchema } = require("../validationSchemas/user.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");


module.exports = (app) => {
  app.route("/api/user/signup").post(validator(signupSchema), UserController.signup);
  app.route("/api/user/:id").put(authenticator, UserController.update);
  app.route("/api/user").get(authenticator, UserController.profile);
  app.route("/api/user/login").post(validator(loginSchema), UserController.login);
  app.route("/api/user/changePassword").post(authenticator, UserController.changePassword);
};
