const { party } = require("../lib/database.connection");
const { alreadyExistsException } = require("../exceptions/alreadyExists.exception")
const { notFoundException } = require("../exceptions/notFound.exception");
const AuthorizationException = require("../exceptions/authorizationException");

class PartyService {
    async create(payload, user) {
        let partyData = await party.findOne({ where: {email: payload.email } });
        payload.userId = user.id;
        if (partyData === null) {
            let data = await party.create(payload)
            return data;
        }
        else {
            throw new alreadyExistsException("Party");
        }
    }
    async update(payload,user) {
        const partyData=await this.findById(payload.party_id);
        if(user.id!==parseInt(partyData.userId)){
            throw new AuthorizationException;
        }
        const returnData = await party.update(payload, {
            where: { id:payload.party_id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await party.findAll();
        return returnData;
    }

    async findById(id) {
        const partyData = await party.findOne({ where: { id } })
        if (partyData === null)
            throw new notFoundException("Party")
        const returnData = await party.findOne({ where: { id } });
        return returnData;
    }
    async delete(id,user) {
        const partyData=await this.findById(id);
        if(user.id!==parseInt(partyData.userId)){
            throw new AuthorizationException;
        }
        const returnData = await party.destroy({ where: { id } });
        return returnData;
    }
}

module.exports = new PartyService();