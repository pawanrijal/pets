module.exports = (sequelize, type) => {
    return sequelize.define("access", {
        roleId: {
            type: type.INTEGER
        },
        modulePriviledgeId: {
            type: type.INTEGER
        }
    });
};
