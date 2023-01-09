

module.exports = (sequelize, type) => {
    return sequelize.define(
        "transactions",
        {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            receiptNo: {
                type: type.STRING,
                allowNull: true,
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
                type: type.DATE,
                allowNull: false
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

            }
        },
        {
            timestamps: true
        }
    );
};
