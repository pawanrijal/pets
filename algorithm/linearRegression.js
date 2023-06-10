// Function to calculate the prediction using linear regression
const calculatePrediction = (data) => {
  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  // Calculate the sums
  for (let i = 0; i < n; i++) {
    const x = i + 1;
    const y = data[i].amount;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;
  const slope = (sumXY - n * meanX * meanY) / (sumX2 - n * meanX * meanX);
  const intercept = meanY - slope * meanX;

  const prediction = Math.max(slope * 4 + intercept, 0);
  return prediction;
};

module.exports = { calculatePrediction };
