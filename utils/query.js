const financeService = require("../service/finance.service");

const getDateOnly = (date) => {
    return date.toISOString().slice(0, 10);
}

const runQueries = async (date, type) => {
    const currentAmount = await financeService.getTotalAmountOfDate({ date: getDateOnly(date), type: type });
    const previousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const previousAmount = await financeService.getTotalAmountOfDate({ date: getDateOnly(previousMonthDate), type: type });
    return {
        "label": date,
        "current": currentAmount.total === null ? 0 : currentAmount.total,
        "previous": previousAmount.total === null ? 0 : previousAmount.total
    };
}
module.exports = {runQueries,getDateOnly };