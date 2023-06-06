const predict = async (financeData, type, targetMonth) => {
  const financeRecords = financeData.filter((record) => record.type === type);

  const averageFinance = calculateAverageAmount(financeRecords);
  const currentFinance = calculateTotalAmountForMonth(
    financeRecords,
    targetMonth
  );

  const financeDifference = currentFinance - averageFinance;

  const predictedFinance = currentFinance + financeDifference;

  return predictedFinance;
};

const calculateAverageAmount = (records) => {
  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);
  return records.length > 0 ? totalAmount / records.length : 0;
};

const calculateTotalAmountForMonth = (records, targetMonth) => {
  const totalAmount = records
    .filter((record) => record.date.startsWith(targetMonth))
    .reduce((sum, record) => sum + record.amount, 0);
  return totalAmount;
};

module.exports = { predict };
