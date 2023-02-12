const { notFoundException } = require("../exceptions/notFound.exception");
const goalService = require("../service/goal.service");
const successResponse = require("../utils/successResponse");

class GoalController {
    async create(req, res, next) {
        try {
            const goalData = await goalService.create(req.body,req.user);
            successResponse(res, 200, goalData, "Goal Created");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const goalData = await goalService.findAll(req.user);
            successResponse(res, 200, goalData, "Goal fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const  id  = req.params.id;
        try {
            const goalData = await goalService.findById(id,req.user);
            if (goalData === null) {
                throw new notFoundException("Goal")
            }
            successResponse(res, 200, goalData, "Goal fetched");
        } catch (err) {
            next(err);
        }
    }


    async update(req, res, next) {
        const { id } = req.params;
        try {
            const goalData = await goalService.update(req.body,id,req.user);
            successResponse(res, 200, goalData, "Goal updated");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const goalData = await goalService.delete(id,req.user);
            successResponse(res, 200, goalData, "Goal deleted");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new GoalController;