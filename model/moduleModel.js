module.exports=(sequelize,type)=>{
    return sequelize.define("modules",{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: type.STRING,
            allowNull: false,
        },
        description:{
            type:type.STRING,
            allowNull:false
        },
        path: {
            type: type.STRING,
            allowNull: false,
            unique:true,
        },

    },{
        timestamps:true
    })
}