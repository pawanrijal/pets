module.exports = (sequelize, type) => {
    return sequelize.define("modulePriviledges", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        moduleId: {
            type: type.INTEGER,

        },
        privilegeId: {
            type: type.INTEGER,
        },


    }, {
        defaultScope: {
            attributes: { exclude: [ "createdAt", "updatedAt"] },
          },
        timestamps: true
    })
}