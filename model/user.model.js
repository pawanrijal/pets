
module.exports = (sequelize, type) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: type.STRING,
        allowNull: false,
      },
      password: {
        type: type.STRING,
        allowNull: false,
      },
      profile_pic: {
        type: type.STRING,
      },
      email: {
        type: type.STRING,
        unique: true,
        allowNull: false,
      }
    },
    {
      timestamps: true
    }
  );
};
