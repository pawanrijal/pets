const { goal, finance } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");

class GoalService {
  async create(payload, user) {
    payload.userId = user.id;
    const returnData = await goal.create(payload);
    return returnData;
  }

  async update(payload, id, user) {
    await this.findById(id, user);
    const returnData = await goal.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(user, option) {
    const returnData = await goal.findAll({
      where: { userId: user.id },
      ...option,
    });
    const total = await goal.count({
      where: { userId: user.id },
    });

    return { data: returnData, total };
  }

  async findById(id, user) {
    const goalData = await goal.findOne({ where: { id } });
    if (goalData === null || goalData === undefined)
      throw new notFoundException("goal");
    if (user.id !== parseInt(goalData.userId)) throw new Error("Unauthorized");
    return goalData;
  }

  async delete(id, user) {
    await this.findById(id, user);
    const returnData = await goal.destroy({ where: { id } });
    return returnData;
  }
}

module.exports = new GoalService();
