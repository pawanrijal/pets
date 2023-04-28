const { notFoundException } = require("../exceptions/notFound.exception");
const notificationService = require("../service/notification.service");
const successResponse = require("../utils/successResponse");

class NotificationController {
    async findAll(req, res, next) {
        try {
            const goalData = await notificationService.findAll(req.user);
            successResponse(res, 200, goalData, "Notification fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const notificationData = await notificationService.findById(id, req.user);
            if (notificationData === null) {
                throw new notFoundException("Notification")
            }
            successResponse(res, 200, notificationData, "Notification fetched");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new NotificationController;