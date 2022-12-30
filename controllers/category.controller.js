const categoryService=require("../service/categories.service");
const successResponse = require("../utils/successResponse");

class CategoryController{
      async findAll(req, res, next) {
        try {
          const categoryData = await categoryService.findAll();
          successResponse(res, 200, categoryData, "Category fetched");
        } catch (err) {
          console.log(err)
          next(err);
        }
      }
    
      async findById(req, res, next) {
        const { id } = req.params;
        try {
          const categoryData = await categoryService.findById(id);
          successResponse(res, 200, categoryData, "category fetched");
        } catch (err) {
          next(err);
        }
      }
}

module.exports=new CategoryController;