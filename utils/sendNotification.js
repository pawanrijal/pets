const { Op } = require("sequelize");
const {
  transaction,
  notification,
  party,
} = require("../lib/database.connection");
const { SendMail } = require("./sendMail");

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
    },
  });
  try {
    if (todayTransactions.length > 0) {
      todayTransactions.forEach(async (element) => {
        const partyData = await party.findOne({
          where: { id: element.partyId },
        });
        if (element.type == "in") {
          var html = `Hi ${user.username} 
      You have ${element.amount} rupees to receive from ${partyData.name}`;
        } else {
          var html = `Hi ${user.username} 
      You have ${element.amount} rupees to give to ${partyData.name}`;
        }
        const sendMail = new SendMail(user.email, "Payment Notification", html);
        sendMail.send();
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

module.exports = { sendNotification };
