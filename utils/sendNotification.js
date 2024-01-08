const { Op } = require("sequelize");
const {
  transaction,
  notification,
  party,
  target,
} = require("../lib/database.connection");
const { SendMail } = require("./sendMail");
const { Server } = require("socket.io");
const { sendFirebase } = require("./firebseNotification");

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const sendNotification = async (user) => {
  const todayTransactions = await transaction.findAll({
    where: {
      paymentDate: getTodayDate(),
      [Op.or]: [{ notified: null }, { notified: false }],
      userId: user.id,
    },
  });
  try {
    if (todayTransactions.length > 0) {
      todayTransactions.forEach(async (element) => {
        const partyData = await party.findOne({
          where: { id: element.partyId },
        });
        if (element.type == "in") {
          var html = `Hi ${user.username}  You have ${element.amount} rupees to give to ${partyData.name}`;
        } else {
          var html = `Hi ${user.username} You have ${element.amount} rupees to recieve from ${partyData.name}`;
        }
        const sendMail = new SendMail(user.email, "Payment Notification", html);
        sendMail.send();
        console.log(user.deviceToken);
        sendFirebase("Payment Notification", html, user.deviceToken);
        await notification.create({
          type: html,
          data: JSON.stringify(element),
          userId: user.id,
          readAt: null,
        });
        await transaction.update(
          { notified: true },
          {
            where: { id: element.id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          }
        );
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

const checkTodayTarget = async (user) => {
  const todayTargets = await target.findAll({
    where: {
      desireDate: getTodayDate(),
      [Op.or]: [{ targetReached: null }, { targetReached: false }],
      [Op.or]: [{ notified: null }, { notified: false }],
      userId: user.id,
    },
  });

  try {
    if (todayTargets.length > 0) {
      todayTargets.forEach(async (element) => {
        const message = `You have target of ${element.name} is expired today.`;
        const sendMail = new SendMail(
          user.email,
          "Target Notification",
          message
        );
        sendMail.send();
        console.log(user.deviceToken);
        sendFirebase("Target Notification", message, user.deviceToken);
        await notification.create({
          type: message,
          data: JSON.stringify(element),
          userId: user.id,
          readAt: null,
        });
        await target.update(
          { notified: true },
          {
            where: { id: element.id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          }
        );
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { sendNotification, checkTodayTarget };
