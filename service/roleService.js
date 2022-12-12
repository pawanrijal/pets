
const { role,user,userRole, product} = require("../lib/databaseConnection");
const userService=require("../service/userService")
const roleService=require("../service/roleService")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")

class RoleService {
    async create(payload) {
        let roleData = await role.findOne({where:{name:payload.name}});
        if(roleData===null) {
            let data = await role.create(payload)
            return data;
        }
        else{
            throw new alreadyExistsException("Role")
        }
    }

    async update(payload, id) {
        await this.findById(id)
        const returnData = await role.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });


        return returnData;
    }

    async findAll() {
        const returnData = await role.findAll({include:user});
        return returnData;
    }

    async findById(id) {
        const roleData=await role.findOne({where:{id}})
        if(roleData===null)
            throw new notFoundException("Role")
        const returnData = await role.findOne({ where: { id },include:user });
        return returnData;
    }
    async delete(id) {
        await this.findById(id)
        const returnData = await role.destroy({ where: { id } });
        return returnData;
    }
    async assignRoleToUser(payload){
        //check if user exists
        await userService.findById(payload.userId)

        //check if role exists
        await this.findById(payload.roleId)
        // check if mapping already exists
        const assigned = await userRole.findOne({
            where: payload,
        });

        if (assigned)
            throw new alreadyExistsException("User with this role");

        // create the mapping
        await userRole.create(payload);

    }

    async removeRoleToUser(payload){
        //check if user exists
        await userService.findById(payload.userId)

        //check if role exists
        await roleService.findById(payload.roleId)


        // check if mapping already exists
        const assigned = await userRole.findOne({
            where: payload,
        });

        if (assigned===null||null===undefined){
            throw new notFoundException("Role with this User")
        }
        await userRole.destroy({
            where:payload
        })
    }
}



module.exports = new RoleService()