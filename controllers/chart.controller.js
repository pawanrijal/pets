const { finance, user } = require("../lib/database.connection");
const financeService = require("../service/finance.service");
const successResponse = require("../utils/successResponse");
class ChartController {
    async chart(req, res, next) {
        const { type } = req.query;
        const financeData = await finance.findAll({ where: { type: type, userId: req.user.id } });
        const returnData = [];
        financeData.map(async (data) => {
            const currentAmount = await financeService.getTotalAmountOfDate({ date: "2022-03-03T00:00:00.000Z", type: "income" });
            console.log(returnData.filter(value => value == { "date": data.date }).length > 0)
            if (returnData.filter(value => value == { "date": data.date }).length > 0) {
                returnData.push({ "date": data.date, "current": currentAmount.total });
            }
        });
        const { total } = await financeService.getTotalAmountOfDate({ date: "2022-03-03T00:00:00.000Z", type: "income" });
        successResponse(res, 200, returnData, "Finance fetched");
    }
}



module.exports = new ChartController;