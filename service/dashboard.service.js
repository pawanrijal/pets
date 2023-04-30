const { transaction, finance } = require("../lib/database.connection");

class DashboardService {
  async getData(user) {
    const totalIncome =
      (await finance.sum("amount", {
        where: { type: "income", userId: user.id },
      })) ?? 0;
    const totalExpense =
      (await finance.sum("amount", {
        where: { type: "expense", userId: user.id },
      })) ?? 0;
    const totalCashIn =
      (await transaction.sum("amount", {
        where: { type: "in", userId: user.id },
      })) ?? 0;
    const totalCashOut =
      (await transaction.sum("amount", {
        where: { type: "out", userId: user.id },
      })) ?? 0;

    const totalBalance =
      totalIncome + totalCashIn - (totalExpense + totalCashOut);

    return {
      ...(totalIncome !== 0 && { totalIncome }),
      ...(totalExpense !== 0 && { totalExpense }),
      ...(totalCashIn !== 0 && { totalCashIn }),
      ...(totalCashOut !== 0 && { totalCashOut }),
      ...(totalBalance !== 0 && { totalBalance }),
    };
  }
}

module.exports = new DashboardService();
