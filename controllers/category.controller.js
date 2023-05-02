const { notFoundException } = require("../exceptions/notFound.exception");
const categoryService = require("../service/categories.service");
const successResponse = require("../utils/successResponse");

class CategoryController {
  async findAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const option = {};
      if (limit != null && offset != null) {
        option.limit = parseInt(limit);
        option.offset = parseInt(offset);
      }
      option.order = [["createdAt", "DESC"]];
      const categoryData = await categoryService.findAll(req.user, option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: categoryData.total,
      };
      successResponse(res, 200, categoryData.data, "Category fetched", meta);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const categoryData = await categoryService.findById(id);
      if (categoryData === null) {
        throw new notFoundException("Category");
      }
      successResponse(res, 200, categoryData, "category fetched");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryController();
