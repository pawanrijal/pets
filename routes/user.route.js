const UserController = require("../controllers/user.controller");
const { signupSchema, loginSchema, forgotPasswordSchema, resetSchema, tokenSchema } = require("../validationSchemas/user.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
const {upload}=require("../middleware/upload.middleware");

module.exports = (app) => {
  app.route("/api/user/forgotPassword").post(validator(forgotPasswordSchema), UserController.forgotPassword);
  app.route("/api/signup").post(upload.single('profilePic'),validator(signupSchema), UserController.signup);
  app.route("/api/user").put(authenticator,upload.single('profilePic'), UserController.update);
  app.route("/api/user").get(authenticator, UserController.profile);
  app.route("/api/login").post(validator(loginSchema), UserController.login);
  app.route("/api/reset/:id/:token").post(validator(resetSchema), UserController.resetPassword);
};
