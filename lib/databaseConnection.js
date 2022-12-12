const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/userModel");

const Role = require("../model/roleModel")
const Module = require("../model/moduleModel")
const Privilege = require("../model/priviledgeModel")
const Access = require("../model/accessModel")
const UserRole = require("../model/userRole")
const ModulePriviledge = require("../model/modulePriviledge")


const db = {};

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_username, process.env.DB_password, {
  host: process.env.DB_host,
  dialect: process.env.dialect,
  port: process.env.DB_port,
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
const userroleModel = UserRole(sequelize, Sequelize.DataTypes)
const modulePriviledgeModel = ModulePriviledge(sequelize, Sequelize.DataTypes)


//authorization


userModel.belongsToMany(roleModel, { through: userroleModel })//userRole as mapping of user and role
roleModel.belongsToMany(userModel, { through: userroleModel })

//mapping of module and priviledge

moduleModel.belongsToMany(priviledgeModel, { through: modulePriviledgeModel })
priviledgeModel.belongsToMany(moduleModel, { through: modulePriviledgeModel })


//mapping of role and modulePriviledge
roleModel.belongsToMany(modulePriviledgeModel, { through: accessModel })
modulePriviledgeModel.belongsToMany(roleModel, { through: accessModel })










db.user = userModel;
db.role = roleModel
db.access = accessModel
db.modules = moduleModel
db.priviledge = priviledgeModel
db.userRole = userroleModel
db.sequelize = sequelize;
module.exports = db;
