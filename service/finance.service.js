const {
  finance,
  user,
  sequelize,
  goal,
  notification,
} = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const goalService = require("./goal.service");
const HttpException = require("../exceptions/http.exception");
const { Sequelize, Op } = require("sequelize");
const { predict } = require("../algorithm/predictionImpl");

class FinanceService {
  async create(payload, _user) {
    const t = await sequelize.transaction();
    try {
      payload.userId = _user.id;
      _user = await user.findOne({ where: _user.id, include: goal });
      let data = await finance.create(payload);
      await this.notifyIfExpenseExceedsIncome(_user);
      await this.notifyIfPrevExpenseExceedsExpense(_user);
      await t.commit();
      return data;
    } catch (e) {
      t.rollback();
      console.log(e);
      throw new HttpException(500, "Something Went Wrong");
    }
  }

  async createTransaction(payload, _user) {
    const t = await sequelize.transaction();
    try {
      payload.userId = _user.id;
      const userWithGoals = await user.findOne({
        where: { id: _user.id },
        include: goal,
      });

      for (const goal of userWithGoals.goals) {
        payload.goalId = goal.id;
        const limit = await this.isApproachingLimit(payload, userWithGoals);

        if (limit?.isApproaching && !limit?.approached) {
          await notification.create({
            type: `Goal Target is approaching for goal ${goal.id}`,
            data: JSON.stringify(userWithGoals.goals),
            userId: _user.id,
            readAt: null,
          });
        }

        if (limit?.approached) {
          await notification.create({
            type: `Goal Target is met for goal ${goal.id}`,
            data: JSON.stringify(userWithGoals.goals),
            userId: _user.id,
            readAt: null,
          });
        }
      }
      const data = await finance.create(payload);
      await t.commit();
      return data;
    } catch (error) {
      t.rollback();
      console.log(error);
      throw new HttpException(500, "Something went wrong.");
    }
  }

  async update(payload, id, user) {
    await this.findById(id, user);
    const returnData = await finance.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(user, type, option) {
    if (type != undefined && type != "") {
      const returnData = await finance.findAll({
        where: { userId: user.id, type: type },
        ...option,
      });
      const total = await finance.count({
        where: { userId: user.id, type: type },
      });
      return { data: returnData, total };
    }

    const returnData = await finance.findAll({
      where: { userId: user.id },
      ...option,
    });
    const total = await finance.count({
      where: { userId: user.id },
    });
    return { data: returnData, total };
  }

  async findById(id, user) {
    const financeData = await finance.findOne({ where: { id } });
    if (financeData === null || financeData === undefined)
      throw new notFoundException("Finance");
    if (user.id !== parseInt(financeData.userId))
      throw new Error("Unauthorized");
    return financeData;
  }

  async delete(id, user) {
    await this.findById(id, user);
    const returnData = await finance.destroy({ where: { id } });
    return returnData;
  }
  async amount(payload, user) {
    console.log(user);
    const query = {
      type: payload.type,
      userId: user.id,
    };
    if (payload.month != undefined && payload.month != null) {
      const startDate = new Date(
        new Date().getFullYear(),
        parseInt(payload.month) - 1,
        1
      );
      const endDate = new Date(
        new Date().getFullYear(),
        parseInt(payload.month),
        0
      );

      query.date = {
        [Sequelize.Op.between]: [
          startDate.toISOString().slice(0, 10),
          endDate.toISOString().slice(0, 10),
        ],
      };
    }
    if (payload.partyId != undefined && payload.partyId != null) {
      query.partyId = payload.partyId;
      await partyService.findById(payload.partyId, user);
    }
    const amount = await finance.sum("amount", {
      where: query,
    });
    return { amount: amount ?? 0 };
  }

  async getTotalAmountOfDate(payload) {
    const { date, type, user } = payload;
    const total = await finance.findOne({
      attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
      where: { type: type, date: date, userId: user.id },
    });
    return total.dataValues;
  }

  async isApproachingLimit(payload, user) {
    const goalData = await goalService.findById(payload.goalId, user);
    if (goalData === null || goalData === undefined) {
      return false;
    }
    const now = new Date();
    const month = now.getMonth() + 1;
    payload.month = month;
    payload.type = "expense";
    const totalAmount = await this.amount(payload, user);
    const data = {};
    if (totalAmount.amount > goalData.targetAmount * 0.75) {
      data.isApproaching = true;
    }
    if (totalAmount.amount >= goalData.targetAmount) {
      data.approached = true;
    }
    return data;
  }

  async predict(user, type) {
    const financeData = await this.findAll(user, type);
    const prediction = await predict(financeData.data, type, "2023-05");
    return prediction;
  }

  async calculatePreviousMonthIncome(user) {
    const currentDate = new Date();
    const previousMonthDate = new Date();
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

    // Get the first and last day of the previous month
    const firstDay = new Date(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth(),
      1
    );
    const lastDay = new Date(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth() + 1,
      0
    );

    try {
      // Retrieve income records for the previous month
      const previousMonthIncomes = await finance.findAll({
        where: {
          type: "income",
          date: {
            [Op.between]: [
              firstDay.toISOString().split("T")[0],
              lastDay.toISOString().split("T")[0],
            ],
          },
          userId: user.id,
        },
      });

      // Calculate the total income
      const totalIncome = previousMonthIncomes.reduce(
        (sum, income) => sum + income.amount,
        0
      );

      console.log("Previous month income:", totalIncome);

      return totalIncome;
    } catch (error) {
      console.error("Error calculating previous month income:", error);
      throw error;
    }
  }

  async notifyIfExpenseExceedsIncome(user) {
    const currentMonthExpenses = await this.calculateCurrentMonthExpense(user);
    const previousMonthIncome = await this.calculatePreviousMonthIncome(user);

    if (currentMonthExpenses > previousMonthIncome) {
      console.log(
        "Alert: Your expenses for this month exceed your income from the previous month."
      );
      await notification.create({
        type: "Your expenses for this month exceed your income from the previous month",
        data: null,
        userId: user.id,
        readAt: null,
      });
    }
  }

  async notifyIfPrevExpenseExceedsExpense(user) {
    const currentMonthExpenses = await this.calculateCurrentMonthExpense(user);
    const previousMonthExpense = await this.calculatePreviousMonthExpense(user);

    if (currentMonthExpenses > previousMonthExpense) {
      await notification.create({
        type: "Your expenses for this month exceed your expense from the previous month.Please limit your expenses",
        data: null,
        userId: user.id,
        readAt: null,
      });
    }
  }

  async calculateCurrentMonthExpense(user) {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    try {
      // Retrieve expense records for the current month
      const currentMonthExpenses = await finance.findAll({
        where: {
          type: "expense",
          date: {
            [Op.between]: [
              firstDay.toISOString().split("T")[0],
              lastDay.toISOString().split("T")[0],
            ],
          },
          userId: user.id,
        },
      });

      // Calculate the total expense
      const totalExpense = currentMonthExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      console.log("Current month expense:", totalExpense);
      return totalExpense;
    } catch (error) {
      console.error("Error catlculating current month expense:", error);
      throw error;
    }
  }

  async calculatePreviousMonthExpense() {
    const currentDate = new Date();
    const previousMonthDate = new Date();
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

    // Get the first and last day of the previous month
    const firstDay = new Date(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth(),
      1
    );
    const lastDay = new Date(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth() + 1,
      0
    );

    try {
      // Retrieve income records for the previous month
      const previousMonthExpenses = await finance.findAll({
        where: {
          type: "expense",
          date: {
            [Op.between]: [
              firstDay.toISOString().split("T")[0],
              lastDay.toISOString().split("T")[0],
            ],
          },
          userId: user.id,
        },
      });

      // Calculate the total income
      const totalExpense = previousMonthExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      console.log("Previous month expense:", totalExpense);

      return totalExpense;
    } catch (error) {
      console.error("Error calculating previous month expense:", error);
      throw error;
    }
  }
}

module.exports = new FinanceService();
