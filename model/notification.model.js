module.exports = (sequelize, type) => {
  return sequelize.define(
    "notifications",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: type.STRING,
        allowNull: false,
      },
      readAt: {
        type: type.STRING,
        allowNull: true,
      },
      data: {
        type: type.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
