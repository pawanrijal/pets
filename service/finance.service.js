const { finance, user, sequelize, goal, notification } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const goalService = require("./goal.service");
const HttpException = require("../exceptions/http.exception");
const { Sequelize } = require("sequelize");

class FinanceService {
    async create(payload, _user) {
        const t = await sequelize.transaction();
        try {
            payload.userId = _user.id;
            _user = await user.findOne({ where: _user.id, include: goal });
            if (_user.goals.length > 0) {
                const goalData = _user.goals;
                const notifications = [];
                goalData.forEach(async (element) => {
                    payload.goalId = element.id;
                    const limit = await this.isApproachingLimit(payload, _user);
                    if (limit !== undefined || limit !== null) {
                        let type = null;
                        if (limit.isApproaching) {
                            type = `Goal Target is approaching for goal ${element.id}`;
                            notifications.push(await notification.create({ type: type, data: JSON.stringify(goalData), userId: _user.id, readAt: null }));
                        }
                        if (limit.approached) {
                            type = `Goal Target is meet for goal ${element.id}`;
                            notifications.push(await notification.create({ type: type, data: JSON.stringify(goalData), userId: _user.id, readAt: null }));
                        }
                    }
                })
            }
            let data = await finance.create(payload);
            await t.commit();
            return data;
        } catch (e) {
            t.rollback();
            console.log(e);
            throw new HttpException(500, "Something Went Wrong");
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

    async findAll() {
        const returnData = await finance.findAll({ where: { userId: user.id } });
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
        const amount = await finance.sum('amount', {
            where: query
        });
        return { "amount": amount ?? 0 };
    }

    async getTotalAmountOfDate(payload) {
        const { date, type } = payload;
        const total = await finance.findOne({ attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']], where: { type: type, date: date } });
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
        if (totalAmount.amount > (goalData.targetAmount * 0.75)) {
            data.isApproaching = true;
        }
        if (
            totalAmount.amount >= goalData.targetAmount
        ) {
            data.approached = true;
        }
        return data;
    }



}

module.exports = new FinanceService;