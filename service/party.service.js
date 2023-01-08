const { party } = require("../lib/database.connection");
const { alreadyExistsException } = require("../exceptions/alreadyExists.exception")

class PartyService {
    async create(payload, user) {
        let partyData = await party.findOne({ where: { contact_no: payload.contact_no } });
        payload.userId = user.id;
        if (partyData === null) {
            let data = await party.create(payload)
            return data;
        }
        throw new alreadyExistsException("Party with this contact");
    }
    async update(payload,id, user) {
        await this.findById(id,user);
        const returnData = await party.update(payload, {
            where: {id},
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll(user) {
        const returnData = await party.findAll({ where: { userId: user.id } });
        return returnData;
    }

    async findById(id, user) {
        const partyData = await party.findOne({ where: { id } });
        if (partyData === null || partyData === undefined)
            throw new notFoundException("Party");
        const returnData = await party.findOne({ where: { "userId": user.id } });
        if (user.id !== parseInt(partyData.userId)) 
            throw new Error("Unauthorized");
        return returnData;
    }
    async delete(id, user) {
        await this.findById(id,user);
        const returnData = await party.destroy({ where: { id } });
        return returnData;
    }
}

module.exports = new PartyService;