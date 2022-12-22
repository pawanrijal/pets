
const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/user.model");
const Party = require("../model/party.model");
const dotenv = require("dotenv");

dotenv.config();
const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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
});
//model instance created
const userModel = User(sequelize, Sequelize.DataTypes);
const partyModel = Party(sequelize, Sequelize.DataTypes);

// mapping of user and party
partyModel.belongsTo(userModel);
userModel.hasMany(partyModel);


db.user = userModel;
db.sequelize = sequelize;
db.party = partyModel;
module.exports = db;
