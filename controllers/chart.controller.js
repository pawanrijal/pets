const successResponse = require("../utils/successResponse");
const { runQueries } = require("../utils/query");
const { finance, sequelize } = require("../lib/database.connection");
const { getDatesInMonth } = require("dates-in-month");

class ChartController {
  async chart(req, res, next) {
    try {
      const { type } = req.query;
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      // console.log(date.toISOString());
      // const daysInMonth = new Date(year, month + 1, 0).getDate();
      // const datesArray = Array.from(
      //   { length: daysInMonth },
      //   (_, i) => new Date(year, month, i + 1)
      // );
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

  async chart2(req, res, next) {
    const { type } = req.query;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const datesArray = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );
    const data = [];
    const previousMonthDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate()
    );
    await Promise.all(
      datesArray.map(async (date) => {
        data.push({
          label: date,
          current: await finance.findOne({
            attributes: [
              [sequelize.fn("sum", sequelize.col("amount")), "total"],
            ],
            where: { type: type, date: date },
          }),
          previous: await finance.findOne({
            attributes: [
              [sequelize.fn("sum", sequelize.col("amount")), "total"],
            ],
            where: { type: type, date: previousMonthDate },
          }),
        });
      })
    );
    successResponse(res, 200, data, "Chart data fetched");
  }
}

module.exports = new ChartController();
