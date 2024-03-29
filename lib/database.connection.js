const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/user.model");
const Party = require("../model/party.model");
const Category = require("../model/categories.model");
const Finance = require("../model/finance.model");
const Transaction = require("../model/transaction.model");
const Goal = require("../model/goal.model");
const Notification = require("../model/notification.model");
const Target = require("../model/target.model");

const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
      max: 20,
      idle: 30000,
      min: 5,
    },
    define: {
      underscored: true,
    },
  }
);
//model instance created
const userModel = User(sequelize, Sequelize.DataTypes);
const partyModel = Party(sequelize, Sequelize.DataTypes);
const categoryModel = Category(sequelize, Sequelize.DataTypes);
const financeModel = Finance(sequelize, Sequelize.DataTypes);
const transactionModel = Transaction(sequelize, Sequelize.DataTypes);
const goalModel = Goal(sequelize, Sequelize.DataTypes);
const notificationModel = Notification(sequelize, Sequelize.DataTypes);
const targetModel = Target(sequelize, Sequelize.DataTypes);

// mapping of user and party(user has many party)
partyModel.belongsTo(userModel);
userModel.hasMany(partyModel);

// mapping of finance and category(category has many finance and viceversa)
financeModel.belongsTo(categoryModel);
categoryModel.hasMany(financeModel);

// mapping of user and finance(user has many finance)
financeModel.belongsTo(userModel);
userModel.hasMany(financeModel);

//mapping of transaction and party
transactionModel.belongsTo(partyModel);
partyModel.hasMany(transactionModel);

transactionModel.belongsTo(userModel);
userModel.hasMany(transactionModel);

goalModel.belongsTo(categoryModel);
categoryModel.hasMany(goalModel);

goalModel.belongsTo(userModel);
userModel.hasMany(goalModel);

notificationModel.belongsTo(userModel);
userModel.hasMany(notificationModel);

targetModel.belongsTo(userModel);
userModel.hasMany(targetModel);

const db = {};
db.user = userModel;
db.sequelize = sequelize;
db.party = partyModel;
db.category = categoryModel;
db.finance = financeModel;
db.transaction = transactionModel;
db.goal = goalModel;
db.notification = notificationModel;
db.target = targetModel;
module.exports = db;
