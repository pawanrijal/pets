
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
      profilePic: {
        type: type.TEXT,
        allowNull: true
      },
      email: {
        type: type.STRING,
        unique: true,
        allowNull: false,
      },
      resetPasswordToken: {
        type: type.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: type.DATE,
        allowNull: true,
      }
    },
    {
      timestamps: true
    }
  );
};
