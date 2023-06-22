const { notFoundException } = require("../exceptions/notFound.exception");
const targetService = require("../service/target.service");
const successResponse = require("../utils/successResponse");

class TargetController {
  async create(req, res, next) {
    try {
      const targetData = await targetService.create(req.body, req.user);
      successResponse(res, 200, targetData, "target Created");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const option = {};
      if (limit != null && offset != null) {
        option.limit = parseInt(limit);
        option.offset = parseInt(offset);
      }
      option.order = [["createdAt", "DESC"]];
      const targetData = await targetService.findAll(req.user, option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: targetData.total,
      };
      successResponse(res, 200, targetData.data, "target fetched", meta);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const targetData = await targetService.findById(id, req.user);
      if (targetData === null) {
        throw new notFoundException("target");
      }
      successResponse(res, 200, targetData, "target fetched");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const targetData = await targetService.update(req.body, id, req.user);
      successResponse(res, 200, targetData, "target updated");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const targetData = await targetService.delete(id, req.user);
      successResponse(res, 200, targetData, "target deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TargetController();
