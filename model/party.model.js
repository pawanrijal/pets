

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
            contact_no: {
                type: type.STRING,
                unique: true,
                allowNull: false,
            },
        },
        {
            defaultScope: {
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            timestamps: true
        }
    );
};
