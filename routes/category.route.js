const CategoryController = require("../controllers/category.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
module.exports = (app) => {
  app
    .route("/api/category")
    .get(authenticationMiddleware, CategoryController.findAll);
  app.route("/api/category/:id").get(CategoryController.findById);
};
