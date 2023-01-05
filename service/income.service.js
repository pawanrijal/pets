const { income, user } = require("../lib/database.connection");
const { alreadyExistsException } = require("../exceptions/alreadyExists.exception");
const { notFoundException } = require("../exceptions/notFound.exception");

class incomeService {
    async create(payload, user) {
        payload.userId = user.id;
        let data = await income.create(payload)
        return data;
    }
    async update(payload, id, user) {
        const incomeData=await this.findById(id, user);
        if(incomeData==null){
            throw new notFoundException("Income");
        }
        const returnData = await income.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await income.findAll({ include: user });
        return returnData;
    }

    async findById(id, user) {
        const incomeData = await income.findOne({ where: { "userId": user.id } });
        if (user.id !== parseInt(incomeData.userId)) {
            throw new Error("Unauthorized");
        }
        const returnData = await income.findOne({ where: { id } });
        return returnData;
    }
    async delete(id, user) {
        await this.findById(id, user);
        const returnData = await income.destroy({ where: { id } });
        return returnData;
    }
}

module.exports = new incomeService;