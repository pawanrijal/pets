module.exports = (sequelize, type) => {
  return sequelize.define(
    "targets",
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
      targetAmount: {
        type: type.INTEGER,
        allowNull: false,
        default: 0,
      },
      savedAlready: {
        type: type.INTEGER,
        allowNull: false,
        default: 0,
      },
      description: {
        type: type.TEXT,
        allowNull: true,
      },
      targetReached: {
        type: type.BOOLEAN,
        default: false,
      },
      category: {
        type: type.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
