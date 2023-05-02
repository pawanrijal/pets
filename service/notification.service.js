const { notification } = require("../lib/database.connection");

class NotificationService {
  async create(payload, user) {
    payload.userId = user.id;
    const returnData = await notification.create(payload);
    return returnData;
  }

  async update(payload, id, user) {
    await this.findById(id, user);
    const returnData = await notification.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(user, option) {
    const returnData = await notification.findAll({
      where: { userId: user.id },
      ...option,
    });
    const total = await notification.count({
      where: { userId: user.id },
    });

    return { data: returnData, total };
  }

  async findById(id, user) {
    const notificationData = await notification.findOne({ where: { id } });
    if (notificationData === null || notificationData === undefined)
      throw new notFoundException("notification");
    const returnData = await notification.findOne({
      where: { userId: user.id },
    });
    if (user.id !== parseInt(notificationData.userId))
      throw new Error("Unauthorized");
    return returnData;
  }

  async delete(id, user) {
    await this.findById(id, user);
    const returnData = await notification.destroy({ where: { id } });
    return returnData;
  }
}

module.exports = new NotificationService();
