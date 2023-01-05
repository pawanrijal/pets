

module.exports = (sequelize, type) => {
    return sequelize.define(
        "incomes",
        {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            amount: {
                type: type.DOUBLE,
                allowNull: false,
            },
            paymentMethod: {
                type: type.STRING,
                allowNull: false,
            },
            note: {
                type: type.TEXT,
                allowNull: true,
            },
            date:{
                type:type.DATE,
                allowNull:false
            }
        },
        {
            timestamps: true
        }
    );
};
