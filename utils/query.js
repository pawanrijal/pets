const financeService = require("../service/finance.service");

const runQueries = async (date, type) => {
  const currentAmountPromise = financeService.getTotalAmountOfDate({
    date: date,
    type: type,
  });
  let currentDateArr = date.split("-");
  const number = currentDateArr[1] - 1;
  currentDateArr[1] = number.toString().padStart(2, "0");
  const previousDateStr = currentDateArr.join("-");

  const previousAmountPromise = financeService.getTotalAmountOfDate({
    date: previousDateStr,
    type: type,
  });
  const [currentAmount, previousAmount] = await Promise.all([
    currentAmountPromise,
    previousAmountPromise,
  ]);

  return {
    label: date,
    current: currentAmount.total === null ? 0 : currentAmount.total,
    previous: previousAmount.total === null ? 0 : previousAmount.total,
  };
};
module.exports = { runQueries };
