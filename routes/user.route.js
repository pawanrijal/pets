const UserController = require("../controllers/user.controller");
const { signupSchema, loginSchema, forgotPasswordSchema, resetSchema } = require("../validationSchemas/user.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
const multer = require('multer');
const upload = multer({ dest: 'profile/' });

module.exports = (app) => {
  app.route("/api/user/forgotPassword").post(validator(forgotPasswordSchema), UserController.forgotPassword);
  app.route("/api/signup").post(validator(signupSchema),upload.single('profile_pic'), UserController.signup);
  app.route("/api/user").put(authenticator, UserController.update);
  app.route("/api/user").get(authenticator, UserController.profile);
  app.route("/api/login").post(validator(loginSchema), UserController.login);
  app.route("/api/reset/:token").post(validator(resetSchema), UserController.reset);
};
