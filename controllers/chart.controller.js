const successResponse = require("../utils/successResponse");
const { runQueries } = require("../utils/query");
const { finance, category } = require("../lib/database.connection");
const { getDatesInMonth } = require("dates-in-month");
const { predict } = require("../algorithm/predictionImpl");
const financeService = require("../service/finance.service");
const { Op } = require("sequelize");

class ChartController {
  async chart(req, res, next) {
    try {
      const { type } = req.query;
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const currentMonthDates = getDatesInMonth({ month, year });
      const data = [];
      await Promise.all(
        currentMonthDates.map(async (date) => {
          const parts = date.split("-");
          const reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
          data.push(await runQueries(reversedDate, type, req.user));
        })
      );
      successResponse(res, 200, data, "Chart data fetched");
    } catch (err) {
      next(err);
    }
  }

  async predictionChart(req, res, next) {
    try {
      const { targetMonth, type } = req.query;

      const categoryData = await category.findAll();
      const returnData = [];

      const totalByCategory = async (user, categoryId, type) => {
        const formatDate = (date) => {
          const parts = date.split("-");
          const reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
          return reversedDate;
        };

        const month = targetMonth.split("-")[1];
        const year = targetMonth.split("-")[0];
        const currentMonthDates = getDatesInMonth({ month, year });
        const startDate = formatDate(currentMonthDates[0]);
        const endDate = formatDate(
          currentMonthDates[currentMonthDates.length - 1]
        );
        const totalAmount = await finance.sum("amount", {
          where: {
            date: {
              [Op.between]: [startDate, endDate],
            },
            categoryId,
            userId: user.id,
            type: type,
          },
        });
        return totalAmount ?? 0;
      };

      await Promise.all(
        categoryData.map(async (category) => {
          const financeData = await finance.findAll({
            where: {
              categoryId: category.id,
              userId: req.user.id,
              type: type,
            },
          });
          const data = await predict(
            financeData,
            type,
            targetMonth,
            category.id
          );
          const currentData = await totalByCategory(
            req.user,
            category.id,
            type
          );
          returnData.push({
            label: category.title,
            predictedData: data,
            currentData,
          });
        })
      );
      successResponse(res, 200, returnData, "Chart data fetched");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChartController();
