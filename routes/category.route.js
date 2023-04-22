const CategoryController = require("../controllers/category.controller");
module.exports = (app) => {
    app.route("/api/category").get(CategoryController.findAll);
    app.route("/api/category/:id").get(CategoryController.findById);
};