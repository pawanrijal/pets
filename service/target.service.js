const { target } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");

class TargetService {
  async create(payload, user) {
    payload.userId = user.id;
    const returnData = await target.create(payload);
    return returnData;
  }

  async update(payload, id, user) {
    await this.findById(id, user);
    const returnData = await target.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(user, option) {
    const returnData = await target.findAll({
      where: { userId: user.id },
      ...option,
    });
    const total = await target.count({
      where: { userId: user.id },
    });

    return { data: returnData, total };
  }

  async findById(id, user) {
    const targetData = await target.findOne({ where: { id } });
    if (targetData === null || targetData === undefined)
      throw new notFoundException("target");
    if (user.id !== parseInt(targetData.userId))
      throw new Error("Unauthorized");
    return targetData;
  }

  async delete(id, user) {
    await this.findById(id, user);
    const returnData = await target.destroy({ where: { id } });
    return returnData;
  }
}

module.exports = new TargetService();
