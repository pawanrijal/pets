const { notFoundException } = require("../exceptions/notFound.exception");
const notificationService = require("../service/notification.service");
const successResponse = require("../utils/successResponse");

class NotificationController {
  async findAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const option = {};
      if (limit != null && offset != null) {
        option.limit = parseInt(limit);
        option.offset = parseInt(offset);
      }
      option.order = [["createdAt", "DESC"]];

      const notificationData = await notificationService.findAll(
        req.user,
        option
      );
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: notificationData.total,
      };
      successResponse(
        res,
        200,
        notificationData.data,
        "Notification fetched",
        meta
      );
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const notificationData = await notificationService.findById(id, req.user);
      if (notificationData === null) {
        throw new notFoundException("Notification");
      }
      successResponse(res, 200, notificationData, "Notification fetched");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new NotificationController();
