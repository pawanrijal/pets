const dashboardService = require("../service/dashboard.service");
const successResponse = require("../utils/successResponse");

class DashboardController {
  async getData(req, res, next) {
    try {
      const { startDate, endDate } = req.query;
      const data = await dashboardService.getData(req.user, {
        startDate,
        endDate,
      });
      successResponse(res, 200, data, "Data Fetched Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new DashboardController();
