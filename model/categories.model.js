

module.exports = (sequelize, type) => {
    return sequelize.define(
        "categories",
        {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: type.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true
        }
    );
};
