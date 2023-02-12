const { transaction, user } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const { Sequelize } = require("sequelize");
const partyService = require("../service/party.service");
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

    async findAll(payload, user) {
        if (payload.partyId != null || payload.partyId != undefined) {
            return await transaction.findAll({ where: { userId: user.id, partyId: payload.partyId } });
        }
        return await transaction.findAll({ where: { userId: user.id } });
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

    async amount(payload, user) {
        const query = {
            type: payload.type,
            userId: user.id
        }
        if (payload.month != undefined && payload.month != null) {
            const startDate = new Date(new Date().getFullYear(), parseInt(payload.month) - 1, 1);
            const endDate = new Date(new Date().getFullYear(), parseInt(payload.month), 0);

            query.date = {
                [Sequelize.Op.between]: [
                    startDate.toISOString().slice(0, 10)
                    ,
                    endDate.toISOString().slice(0, 10)
                ]
            };
        }
        if (payload.partyId != undefined && payload.partyId != null) {
            query.partyId = payload.partyId;
            await partyService.findById(payload.partyId, user);
        }
        const amount = await transaction.sum('amount', {
            where: query
        });
        return { "amount": amount ?? 0 };;
    }
}

module.exports = new TransactionService;