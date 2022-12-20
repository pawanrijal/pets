const partyService=require("../service/party.service");
const successResponse = require("../utils/successResponse");

class PartyController{
    async create(req, res, next) {
        try {
          const user=await req.user;

          const party = await partyService.create(req.body,user);
          
          successResponse(res, 200, party, "Party Created");
        } catch (err) {
          next(err);
        }
      }
    
      async update(req, res, next) {
        try {
          const partyData = await partyService.update(req.body,await req.user);
          successResponse(res, 200, partyData, "Party updated");
        } catch (err) {
          next(err);
        }
      }
    
      async findAll(req, res, next) {
        try {
          const partyData = await partyService.findAll();
          successResponse(res, 200, partyData, "Party fetched");
        } catch (err) {
          console.log(err)
          next(err);
        }
      }
    
      async findById(req, res, next) {
        const { id } = req.params;
        try {
          const partyData = await partyService.findById(id);
          successResponse(res, 200, partyData, "Party fetched");
        } catch (err) {
          next(err);
        }
      }
    
      async delete(req, res, next) {
        try {
          const partyData = await partyService.delete(req.body.partyId, await req.user);
          successResponse(res, 200, partyData, "party Deleted");
        } catch (err) {
          next(err);
        }
      }

}

module.exports=new PartyController;