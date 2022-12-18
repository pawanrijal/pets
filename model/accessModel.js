module.exports = (sequelize, type) => {
    return sequelize.define("access", {
        roleId: {
            type: type.INTEGER
        },
        modulePriviledgeId: {
            type: type.INTEGER
        }
    }, {
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        timestamps: true
    });
};
