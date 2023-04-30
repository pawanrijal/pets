const { transaction, finance } = require("../lib/database.connection");

class DashboardService {
  async getData(user) {
    const totalIncome = await finance.sum("amount", {
      where: { type: "income", userId: user.id },
    });
    const totalExpense = await finance.sum("amount", {
      where: { type: "expense", userId: user.id },
    });
    const totalCashIn = await transaction.sum("amount", {
      where: { type: "in", userId: user.id },
    });
    const totalCashOut = await transaction.sum("amount", {
      where: { type: "out", userId: user.id },
    });

    const totalBalance =
      totalIncome + totalCashIn - (totalExpense + totalCashOut);

    return {
      totalIncome,
      totalExpense,
      totalCashIn,
      totalCashOut,
      totalBalance,
    };
  }
}

module.exports = new DashboardService();
