const { target, notification } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const dashboardService = require("./dashboard.service");
const { sendFirebase } = require("../utils/firebseNotification");
const { SendMail } = require("../utils/sendMail");

class TargetService {
  async create(payload, user) {
    payload.userId = user.id;
    const returnData = await target.create(payload);
    return returnData;
  }

  async update(payload, id, user) {
    await this.findById(id, user);
    const returnData = await target.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(user, option) {
    const returnData = await target.findAll({
      where: { userId: user.id },
      ...option,
    });
    const total = await target.count({
      where: { userId: user.id },
    });

    return { data: returnData, total };
  }

  async findById(id, user) {
    const targetData = await target.findOne({ where: { id } });
    if (targetData === null || targetData === undefined)
      throw new notFoundException("target");
    if (user.id !== parseInt(targetData.userId))
      throw new Error("Unauthorized");
    return targetData;
  }

  async delete(id, user) {
    await this.findById(id, user);
    const returnData = await target.destroy({ where: { id } });
    return returnData;
  }

  async checkReachAmount(user) {
    const { totalBalance } = await dashboardService.getData(user);
    console.log("Total Balance", totalBalance);

    const targets = await target.findAll({
      where: { userId: user.id },
    });
    const promises = targets
      .filter(
        ({ targetAmount, notified }) =>
          totalBalance >= targetAmount && (!notified || notified === false)
      )
      .map(async (targetData) => {
        const message = `The target is met for target ${targetData.name} of Rs. ${targetData.targetAmount}.`;
        sendFirebase("Target Notification", message, user.deviceToken);
        const sendMail = new SendMail(
          user.email,
          "Target Notification",
          message
        );
        await sendMail.send();
        await notification.create({
          type: message,
          data: JSON.stringify(targetData),
          userId: user.id,
          readAt: null,
        });
        console.log(
          await target.update(
            { targetReached: true, notified: true },
            { where: { id: targetData.id } }
          )
        );
      });
    await Promise.all(promises);
  }
}

module.exports = new TargetService();
