

const successResponse = require("../utils/successResponse");
const { runQueries } = require("../utils/query");
class ChartController {
    async chart(req, res, next) {
        const { type } = req.query;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const datesArray = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
        const data = [];
        await Promise.all(datesArray.map(async (date) => {
            data.push(await runQueries(date, type))
        }));
        successResponse(res, 200, data, "Finance fetched");
    }
}

module.exports = new ChartController;