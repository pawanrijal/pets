const CategoryController = require("../controllers/category.controller");
module.exports = (app) => {
    app.route("/api/Category").get(CategoryController.findAll);
    app.route("/api/Category/:id").get(CategoryController.findById);
};