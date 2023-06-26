const { Op } = require("sequelize");
const { transaction, finance } = require("../lib/database.connection");

class DashboardService {
  async getData(user, range) {
    let incomeFilter = { type: "income", userId: user.id };
    let expenseFilter = { type: "expense", userId: user.id };
    let cashInFilter = { type: "in", userId: user.id };
    let cashOutFilter = { type: "out", userId: user.id };
    if (range) {
      if (range.startDate && range.endDate) {
        incomeFilter.date = { [Op.between]: [range.startDate, range.endDate] };
        expenseFilter.date = {
          [Op.between]: [range.startDate, range.endDate],
        };
        cashInFilter.date = {
          [Op.between]: [range.startDate, range.endDate],
        };
        cashOutFilter.date = {
          [Op.between]: [range.startDate, range.endDate],
        };
      }
    }

    const totalIncome =
      (await finance.sum("amount", { where: incomeFilter })) ?? 0;
    const totalExpense =
      (await finance.sum("amount", { where: expenseFilter })) ?? 0;
    const totalCashIn =
      (await transaction.sum("amount", { where: cashInFilter })) ?? 0;
    const totalCashOut =
      (await transaction.sum("amount", { where: cashOutFilter })) ?? 0;

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
