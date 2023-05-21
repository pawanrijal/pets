const financeService = require("../service/finance.service");

const runQueries = async (date, type, user) => {
  const currentAmountPromise = financeService.getTotalAmountOfDate({
    date: date,
    type: type,
    user: user,
  });
  const currentDateArr = date.split("-");
  const number = currentDateArr[1] - 1;
  currentDateArr[1] = number.toString().padStart(2, "0");
  const previousDateStr = currentDateArr.join("-");

  const previousAmountPromise = financeService.getTotalAmountOfDate({
    date: previousDateStr,
    type: type,
    user: user,
  });
  const [currentAmount, previousAmount] = await Promise.all([
    currentAmountPromise,
    previousAmountPromise,
  ]);

  return {
    label: date,
    current: currentAmount.total ?? 0,
    previous: previousAmount.total ?? 0,
  };
};
module.exports = { runQueries };
