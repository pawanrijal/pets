const RoleService = require("../service/roleService")
const moduleService = require("../service/moduleService")
const privilegeService = require("../service/priviledgeService")
const { modulePriviledge, access } = require("../lib/databaseConnection")
const { alreadyExistsException } = require("../exceptions/alreadyExistsException")
const { notFoundException } = require("../exceptions/notFoundException")


class accessService {
    async addAccessToRole(payload) {
        const role = await RoleService.findById(payload.roleId);
        const module = await moduleService.findById(payload.moduleId);
        const privilege = await privilegeService.findById(payload.privilegeId);

        // check if the mapping between the `module` and `privilege` exists
        const ModulePriviledge = await modulePriviledge.findOne({
            where: {
                moduleId: module.id,
                privilegeId: privilege.id,
            },
        });
        if (ModulePriviledge === null || ModulePriviledge === undefined) {
            throw new notFoundException("Module with this privilege");
        }


        // check if the `role` already has the access
        const grantAccess = await access.findOne({
            where: {
                roleId: role.id,
                modulePriviledgeId: ModulePriviledge.id,
            },
        });
        if (grantAccess) {
            throw new alreadyExistsException("Role with access")
        }

        // create the mapping
        const accessData=await access.create({
            roleId: role.id,
            modulePriviledgeId: ModulePriviledge.id,
        });

        return accessData;
    }

    async removeAccessToRole(payload) {

        const role = await RoleService.findById(payload.roleId);
        const module = await moduleService.findById(payload.moduleId);
        const privilege = await privilegeService.findById(payload.priviledgeId);

        // check if the mapping between the `module` and `privilege` exists
        const ModulePriviledge = await modulePriviledge.findOne({
            where: {
                moduleId: module.id,
                privilegeId: privilege.id,
            },
        });
        if (ModulePriviledge === null || ModulePriviledge === undefined) {
            throw new notFoundException("Module with this privilege");
        }
        // check if the `role` already has the access
        const grantAccess = await access.findOne({
            where: {
                roleId: role.id,
                modulePriviledgeId: ModulePriviledge.id,
            },
        });
        if (grantAccess === null || grantAccess === undefined) {
            throw new notFoundException("Module with this privilege");
        }
        // remove the mapping
        const accessData=await access.destroy({
            where: {
                roleId: role.id,
                modulePriviledgeId: ModulePriviledge.id,
            }
        });

        return accessData;
    }
}

module.exports = new accessService()