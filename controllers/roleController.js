const roleService = require("../service/roleService");
const successResponse = require("../utils/successResponse");

const accessService=require("../service/accessService")

class RoleController {
    async create(req, res, next) {
        try {
            let data=await roleService.create(req.body)
            successResponse(res, 400, data, "created Successfully");
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const roleData = await roleService.update(req.body, id);
            successResponse(res, 200, roleData, "Payment updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const roleData = await roleService.findAll();
            successResponse(res, 200, roleData, "Payments fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        try {
            const id = req.params.id;
            const roleData = await roleService.findById(id);
            successResponse(res, 200, roleData, "fetched");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
                const roleData = await roleService.delete(id);
                successResponse(res, 200, roleData, "Payment Deleted");
        } catch (err) {
            next(err);
        }
    }

    async assignRoleToUser(req,res,next){
        try{
        await roleService.assignRoleToUser(req.body)
            successResponse(res,200,null,"Assigned Role TO User")
        }catch(err){
            next(err)
        }
    }

    async removeRoleToUser(req,res,next){
        try{
            await roleService.removeRoleToUser(req.body)
            successResponse(res,200,null,"Removed Role TO User")
        }catch(err){
            next(err)
        }
    }

    async addAccessToRole(req, res, next) {
        try {
            await accessService.addAccessToRole(req.body);
            successResponse(res, 200, null, "Access has been granted to the role");
        } catch (err) {
            next(err);
        }
    }

    async removeAccessFromRole(req, res, next) {
        try {
            await accessService.removeAccessToRole(req.body);
            successResponse(res, 200, null, "Access has been removed from the role",);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new RoleController();
