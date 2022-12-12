const {modulePriviledge}=require("../lib/databaseConnection")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")

const ModuleService=require("../service/moduleService")
const PrivilegeService=require("../service/priviledgeService")

class ModulePriviledgeService
{
    async addPrivilegeToModule(payload)
    {

        // check if the modules exists
        const {moduleId,privilegeId} = payload;
        const module = await ModuleService.findById(moduleId)
        const privilege = await PrivilegeService.findById(privilegeId)

        // check if the mapping is already done
        const mapping = await modulePriviledge.findOne({where: {moduleId,privilegeId}});
        if (mapping) {
            throw new alreadyExistsException("Privilege to this module");
        }
        // create the mapping
        await modulePriviledge.create(payload);
    }

    async removePrivilegeFromModule(payload){

        // check if the modules exists
        const {moduleId,privilegeId} = payload;
        const module = await ModuleService.findById(moduleId)
        //check if privilege exists
        const privilege = await PrivilegeService.findById(privilegeId)

        // check if the mapping is already done
        const mapping = await modulePriviledge.findOne({where: payload});
        if (mapping==null||mapping==undefined) {
            throw new notFoundException("Privilege in this module");
        }
        // delete the mapping
        await modulePriviledge.destroy({where:payload});
}}

module.exports=new ModulePriviledgeService();
