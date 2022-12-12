module.exports=(sequelize,type)=>{
    return sequelize.define("privileges",{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        description:{
            type:type.STRING,
            allowNull:false
        },
        method: {
            type: type.STRING,
            allowNull: false,
            unique:true,
        },

    },{
        timestamps:true
    })
}