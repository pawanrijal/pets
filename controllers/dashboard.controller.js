class DashboardController {
  async getData() {
    try {
      const data = await dashboardService.getData(req.user);
      successResponse(res, 200, data, "Data Fetched Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
