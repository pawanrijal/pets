// Function to calculate the prediction using linear regression
const calculatePrediction = (data) => {
  const n = data.length; // Number of data points
  let sumX = 0; // Sum of x values
  let sumY = 0; // Sum of y values
  let sumXY = 0; // Sum of product of x and y values
  let sumX2 = 0; // Sum of squared x values

  // Calculate the sums
  for (let i = 0; i < n; i++) {
    const x = i + 1; // Assuming 1-based indexing for months
    const y = data[i].amount;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  // Calculate the coefficients of the regression line
  const meanX = sumX / n;
  const meanY = sumY / n;
  const slope = (sumXY - n * meanX * meanY) / (sumX2 - n * meanX * meanX);
  const intercept = meanY - slope * meanX;

  // Calculate the prediction for the 4th month
  const prediction = Math.max(slope * 4 + intercept, 0); //if the 3 month data is not provided
  return prediction;
};

module.exports = { calculatePrediction };
