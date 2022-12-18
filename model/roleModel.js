module.exports = (sequelize, type) => {
    return sequelize.define("roles", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        defaultScope: {
            attributes: { exclude: [ "createdAt", "updatedAt"] },
          },
        timestamps: true
    })
}