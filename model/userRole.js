module.exports=(sequelize,type)=>{
    return sequelize.define("userRoles",{
        userId:{
            type:type.INTEGER
        },
        roleId:{
            type:type.INTEGER,
        }
    })
}