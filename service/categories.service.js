const { getDatesInMonth } = require("dates-in-month");
const { category, finance, goal } = require("../lib/database.connection");
const { Op } = require("sequelize");

class CategoryService {
  async findAll(user) {
    const categoryData = await category.findAll();
    const data = categoryData.map(async (obj) => {
      const total = await this.totalByCategory(user, obj.id);
      const totalTarget = await this.totalTargetByCategory(user, obj.id);
      return {
        id: obj.id,
        title: obj.title,
        spent: total,
        target: totalTarget,
      };
    });

    return Promise.all(data);
  }

  async findById(id) {
    const returnData = await category.findOne({ where: { id } });
    return returnData;
  }

  async totalByCategory(user, categoryId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    // const month = "04";
    const currentMonthDates = getDatesInMonth({ month, year });
    const startDate = this.formatDate(currentMonthDates[0]);
    const endDate = this.formatDate(
      currentMonthDates[currentMonthDates.length - 1]
    );
    const totalAmount = await finance.sum("amount", {
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
        categoryId,
        userId: user.id,
        type: "expense",
      },
    });
    return totalAmount;
  }

  async totalTargetByCategory(user, categoryId) {
    const totalAmount = await goal.sum("targetAmount", {
      where: {
        categoryId,
        userId: user.id,
      },
    });
    return totalAmount;
  }

  formatDate(date) {
    const parts = date.split("-");
    const reversedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
    return reversedDate;
  }
}

module.exports = new CategoryService();
