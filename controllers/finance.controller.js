const { notFoundException } = require("../exceptions/notFound.exception");
const financeService = require("../service/finance.service");
const successResponse = require("../utils/successResponse");

class FinanceController {
  async create(req, res, next) {
    try {
      const finance = await financeService.create(req.body, req.user);
      successResponse(res, 200, finance, "Finance Created");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const { type } = req.query;
      const financeData = await financeService.findAll(req.user, type);
      successResponse(res, 200, financeData, "Finance fetched");
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
      successResponse(res, 200, financeData, "Finance fetched");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const financeData = await financeService.update(req.body, id, req.user);
      successResponse(res, 200, financeData, "Finance updated");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const financeData = await financeService.delete(id, req.user);
      successResponse(res, 200, financeData, "Finance deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FinanceController();
