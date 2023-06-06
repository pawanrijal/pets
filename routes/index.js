const UserRoute = require("./user.route");
const PartyRoute = require("./party.route");
const CategoryRoute = require("./category.route");
const FinanceRoute = require("./finance.route");
const TransactionRoute = require("./transaction.route");
const ChartRoute = require("./chart.route");
const GoalRoute = require("./goal.route");
const NotificationRoute = require("./notification.route");
const DashboardRoute = require("./dashboard.route");
const {
  imageDecryptionMiddleware,
} = require("../middleware/imageDecryptionMiddleware");
const path = require("path");
const express = require("express");

exports.initRoutes = (app) => {
  UserRoute(app);
  PartyRoute(app);
  CategoryRoute(app);
  FinanceRoute(app);
  TransactionRoute(app);
  ChartRoute(app);
  GoalRoute(app);
  NotificationRoute(app);
  DashboardRoute(app);
  // app.use(
  //   "/preview",
  //   imageDecryptionMiddleware,
  //   app.use("/preview", (req, res, next) => {
  //     const filePath = path.join("uploads", req.fileName);

  //     // Serve the static file
  //     express.static(path.dirname(filePath))(req, res, next);
  //   })
  // );
};
