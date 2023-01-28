const { finance, user,sequelize } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");

class FinanceService {
    async create(payload, user) {
        payload.userId = user.id;
        let data = await finance.create(payload)
        return data;
    }
    
    async update(payload, id, user) {
        await this.findById(id, user);
        const returnData = await finance.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await finance.findAll({ include: user });
        return returnData;
    }

    async findById(id, user) {
        const financeData = await finance.findOne({ where: { id } });
        if (financeData === null || financeData === undefined)
            throw new notFoundException("Finance");
        const returnData = await finance.findOne({ where: { "userId": user.id } });
        if (user.id !== parseInt(financeData.userId)) 
            throw new Error("Unauthorized");
        return returnData;
    }

    async delete(id, user) {
        await this.findById(id, user);
        const returnData = await finance.destroy({ where: { id } });
        return returnData;
    }

    async getTotalAmountOfDate(payload){
        const {date,type}=payload;
        const total=await finance.findOne({attributes:[[sequelize.fn('sum', sequelize.col('amount')), 'total']],where:{type:type,date:date}});
        return total.dataValues;
    }
}

module.exports = new FinanceService;