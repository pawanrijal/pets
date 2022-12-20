
"usestrict";
const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/userModel");

const Role = require("../model/roleModel")
const Module = require("../model/moduleModel");
const Privilege = require("../model/priviledgeModel");
const Access = require("../model/accessModel");
const UserRole = require("../model/userRole");
const ModulePriviledge = require("../model/modulePriviledge");
const Party=require("../model/PartyModel");
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
const roleModel = Role(sequelize, Sequelize.DataTypes)
const moduleModel = Module(sequelize, Sequelize.DataTypes)
const priviledgeModel = Privilege(sequelize, Sequelize.DataTypes)
const accessModel = Access(sequelize, Sequelize.DataTypes)
const userRoleModel = UserRole(sequelize, Sequelize.DataTypes)
const modulePriviledgeModel = ModulePriviledge(sequelize, Sequelize.DataTypes);
const partyModel=Party(sequelize,Sequelize.DataTypes);


//authorization


userModel.belongsToMany(roleModel, { through: userRoleModel });//userRole as mapping of user and role
roleModel.belongsToMany(userModel, { through: userRoleModel });

//mapping of module and priviledge

moduleModel.belongsToMany(priviledgeModel, { through: modulePriviledgeModel });
priviledgeModel.belongsToMany(moduleModel, { through: modulePriviledgeModel });


//mapping of role and modulePriviledge
roleModel.belongsToMany(modulePriviledgeModel, { through: accessModel });
modulePriviledgeModel.belongsToMany(roleModel, { through: accessModel });

// mapping of user and party
partyModel.belongsTo(userModel);
userModel.hasMany(partyModel);


db.user = userModel;
db.role = roleModel
db.access = accessModel
db.modules = moduleModel
db.priviledge = priviledgeModel
db.userRole = userRoleModel
db.sequelize = sequelize;
db.modulePriviledge=modulePriviledgeModel;
db.party=partyModel;
module.exports = db;
