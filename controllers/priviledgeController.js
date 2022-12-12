const privilegeService = require("../service/priviledgeService");
const successResponse = require("../utils/successResponse");


class PrivegeConroller {
    async create(req, res, next) {
        try {
           let data= await privilegeService.create(req.body)
            successResponse(res, 400, data, "Privilege created Successfully");
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const privilegeData = await privilegeService.update(req.body, id);
            successResponse(res, 200, privilegeData, "Privilege updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const privilegeData = await privilegeService.findAll();
            successResponse(res, 200, privilegeData, "Privileges fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const privilegeData = await privilegeService.findById(id);
                successResponse(res, 200, privilegeData, "fetched");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
                const privilegeData = await privilegeService.delete(id);
                successResponse(res, 200, privilegeData, "Privilege Deleted");
        } catch (err) {
            next(err);
        }
    }

}



module.exports = new PrivegeConroller();
