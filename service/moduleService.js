
const {modules, role} = require("../lib/databaseConnection");
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")

class ModuleService {
    async create(payload) {
        let moduleData = await modules.findOne({where:{path:payload.path}});
        if(moduleData!=null){
            throw new alreadyExistsException("Module")
        }
        let data=await modules.create(payload)
        return data;
    }

    async update(payload, id) {
        await this.findById(id)
        const returnData = await modules.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await modules.findAll();
        return returnData;
    }

    async findById(id) {
        let moduleData = await modules.findOne({where:{id}});
        if(moduleData===null){
            throw new notFoundException("Module")
        }
        const returnData = await modules.findOne({ where: { id }});
        return returnData;
    }
    async delete(id) {
        await this.findById(id)
        const returnData = await modules.destroy({ where: { id } });
        return returnData;
    }

}



module.exports = new ModuleService()