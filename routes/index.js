const UserRoute = require("./user.route");
const PartyRoute = require("./party.route");
const CategoryRoute = require("./category.route");
const FinanceRoute=require("./finance.route");
const TransactionRoute=require("./transaction.route");
const ChartRoute=require("./chart.route");

exports.initRoutes = (app) => {
  UserRoute(app);
  PartyRoute(app);
  CategoryRoute(app);
  FinanceRoute(app);
  TransactionRoute(app);
  ChartRoute(app);
};
