module.exports=(sequelize,type)=>{
    return sequelize.define("modulePriviledges",{
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


    },{
        timestamps:true
    })
}