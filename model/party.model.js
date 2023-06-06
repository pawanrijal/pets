module.exports = (sequelize, type) => {
  return sequelize.define(
    "parties",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: type.STRING,
        allowNull: false,
      },
      email: {
        type: type.STRING,
        unique: true,
        allowNull: false,
      },
      contactNo: {
        type: type.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
