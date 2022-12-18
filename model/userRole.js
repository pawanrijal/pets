module.exports = (sequelize, type) => {
    return sequelize.define("user_roles", {
        userId: {
            type: type.INTEGER
        },
        roleId: {
            type: type.INTEGER,
        }
    },
     {
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        timestamps: true
    })
}