const { transaction, user } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");

class TransactionService {
    async create(payload, user) {
        payload.userId = user.id;
        let data = await transaction.create(payload)
        return data;
    }
    
    async update(payload, id, user) {
        await this.findById(id, user);
        const returnData = await transaction.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await transaction.findAll({ include: user });
        return returnData;
    }

    async findById(id, user) {
        const transactionData = await transaction.findOne({ where: { id } });
        if (transactionData === null || transactionData === undefined)
            throw new notFoundException("Transaction");
        const returnData = await transaction.findOne({ where: { "userId": user.id } });
        if (user.id !== parseInt(transactionData.userId)) 
            throw new Error("Unauthorized");
        return returnData;
    }

    async delete(id, user) {
        await this.findById(id, user);
        const returnData = await transaction.destroy({ where: { id } });
        return returnData;
    }
}

module.exports = new TransactionService;