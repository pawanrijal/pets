const partyService = require("../service/party.service");
const successResponse = require("../utils/successResponse");

class PartyController {
  async create(req, res, next) {
    try {
      const user = await req.user;

      const party = await partyService.create(req.body, user);

      successResponse(res, 200, party, "Party Created");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const partyData = await partyService.update(req.body, id, await req.user);
      successResponse(res, 200, partyData, "Party updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const option = {};
      if (limit != null && offset != null) {
        option.limit = parseInt(limit);
        option.offset = parseInt(offset);
      }
      option.order = [["createdAt", "DESC"]];
      const partyData = await partyService.findAll(req.user, option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: partyData.total,
      };
      successResponse(res, 200, partyData.data, "Party fetched", meta);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const partyData = await partyService.findById(id, req.user);
      successResponse(res, 200, partyData, "Party fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const partyData = await partyService.delete(id, req.user);
      successResponse(res, 200, partyData, "party Deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PartyController();
