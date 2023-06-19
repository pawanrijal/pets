module.exports = (sequelize, type) => {
  return sequelize.define(
    "transactions",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      paymentMethod: {
        type: type.STRING,
        allowNull: false,
      },
      amount: {
        type: type.DOUBLE,
        allowNull: false,
      },
      date: {
        type: type.STRING,
        allowNull: false,
      },
      type: {
        type: type.STRING,
        allowNull: false,
      },
      note: {
        type: type.TEXT,
        allowNull: true,
      },
      image: {
        type: type.STRING,
        allowNull: true,
      },
      paymentDate: {
        type: type.STRING,
        allowNull: true,
      },
      notified: {
        type: type.BOOLEAN,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
