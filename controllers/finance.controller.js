const { notFoundException } = require("../exceptions/notFound.exception");
const financeService = require("../service/finance.service");
const successResponse = require("../utils/successResponse");

class FinanceController {
  async create(req, res, next) {
    try {
      const finance = await financeService.create(req.body, req.user);
      const message = finance.type === "expense" ? "Expense" : "Earning";
      successResponse(res, 200, finance, `${message} Created`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const { limit, offset, type } = req.query;
      const option = {};
      if (limit != null && offset != null) {
        option.limit = parseInt(limit);
        option.offset = parseInt(offset);
      }
      option.order = [["createdAt", "DESC"]];
      const financeData = await financeService.findAll(req.user, type, option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: financeData.total,
      };
      const message = req.body.type === "expense" ? "Expense" : "Earning";
      successResponse(res, 200, financeData.data, `${message} Fetched`, meta);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const financeData = await financeService.findById(id, req.user);
      if (financeData === null) {
        throw new notFoundException("Finance");
      }
      const message = financeData.type === "expense" ? "Expense" : "Earning";
      successResponse(res, 200, financeData, `${message} Fetched`);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const financeData = await financeService.update(req.body, id, req.user);
      const message = financeData.type === "expense" ? "Expense" : "Earning";
      successResponse(res, 200, financeData, `${message} updated`);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const financeData = await financeService.delete(id, req.user);
      const message = financeData.type === "expense" ? "Expense" : "Earning";
      successResponse(res, 200, financeData, `${message} deleted`);
    } catch (err) {
      next(err);
    }
  }

  async predict(req, res, next) {
    try {
      const { type } = req.query;
      const predictionData = await financeService.predict(req.user, type);
      successResponse(res, 200, predictionData, "Prediction Done");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FinanceController();
