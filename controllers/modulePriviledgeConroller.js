const modulePriviledgeService = require("../service/modulePriviledgeService")
const successResponse = require("../utils/successResponse");

//add priviledge to module
class modulePriviledgeConroller {
    async addPrivilegeToModule(req, res, next) {
        try {
            let data = await modulePriviledgeService.addPrivilegeToModule(req.body)
            successResponse(res, 400, data, "created Successfully");
        } catch (err) {
            next(err);
        }
    }


    //remove privilege from module
    async removePrivilegeFromModule(req, res, next) {
        try {
            await modulePriviledgeService.removePrivilegeFromModule(req.body)
            successResponse(res, 400, null, "Removed Successfully");

        } catch (err) {
            next(err);
        }
    }
}



module.exports = new modulePriviledgeConroller()