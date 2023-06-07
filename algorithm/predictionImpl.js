const { finance } = require("../lib/database.connection");

const previousMonthData = async (categoryId, type, user) => {
  const previousThreeMonths = getPreviousThreeMonths();
  const financeSum = await Promise.all(
    previousThreeMonths.map(async (month) => {
      console.log(month);
      const financeData = await finance.findAll({
        where: { userId: user.id, type, categoryId },
      });
      const financeDataOfMonth = financeData
        .filter((record) => record.date.startsWith(month))
        .reduce((sum, record) => sum + record.amount, 0);
      console.log(financeDataOfMonth);
      return { month, amount: financeDataOfMonth };
    })
  );
  return financeSum;
};

const getPreviousThreeMonths = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Add 1 because months are zero-based
  const currentYear = currentDate.getFullYear();

  const previousMonths = [];

  for (let i = 1; i <= 3; i++) {
    let month = currentMonth - i;
    let year = currentYear;

    if (month <= 0) {
      month += 12;
      year--;
    }
    const formattedMonth = month.toString().padStart(2, "0");
    previousMonths.push(year + "-" + formattedMonth);
  }

  return previousMonths;
};

module.exports = { previousMonthData, getPreviousThreeMonths };
