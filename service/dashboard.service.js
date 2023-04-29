const financeService = require("./finance.service");

class DashboardService {
  async getData(user) {
    const payload = { type: "income" };
    const totalIncome = await financeService.amount(payload, user);
    console.log(totalIncome);
  }
}

module.exports = DashboardService;
