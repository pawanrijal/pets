module.exports = (sequelize, type) => {
    return sequelize.define(
        "goals",
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
                type: type.DOUBLE,
                allowNull: false,
                default: 0
            },
            description: {
                type: type.TEXT,
                allowNull: false,
            }
        },
        {
            timestamps: true
        }
    );
};
