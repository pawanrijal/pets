const UserController = require("../controllers/user.controller");
const { signupSchema, loginSchema } = require("../validationSchemas/user.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");

const passport = require("passport");

module.exports = (app) => {
  app.route("/api/signup").post(validator(signupSchema), UserController.signup);
  app.route("/api/user").put(authenticator, UserController.update);
  app.route("/api/user").get(authenticator, UserController.profile);
  app.route("/api/login").post(validator(loginSchema), UserController.login);
};
