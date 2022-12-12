
const { priviledge,} = require("../lib/databaseConnection");
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")

class PriviledgeService {
    async create(payload) {
        let priviledgeData = await priviledge.findOne({where:{method:payload.method}});
        if(priviledgeData!=null){
            throw new alreadyExistsException("Privilege")
        }
        let data=await priviledge.create(payload)
        return data;
    }

    async update(payload, id) {
        await this.findById(id)
        const returnData = await priviledge.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await priviledge.findAll();
        return returnData;
    }

    async findById(id) {
        const privelegeData=await priviledge.findOne({where:{id}});
        if(privelegeData===null)
            throw new notFoundException("Privilege")
        const returnData = await priviledge.findOne({ where: { id }});
        return returnData;
    }
    async delete(id) {
        await this.findById(id)
        const returnData = await priviledge.destroy({ where: { id } });
        return returnData;
    }

}



module.exports = new PriviledgeService()