const { notFoundException } = require("../exceptions/notFound.exception");
const incomeService = require("../service/income.service");
const successResponse = require("../utils/successResponse");

class IncomeController {
    async create(req, res, next) {
        try {
            const income = await incomeService.create(req.body,req.user);
            successResponse(res, 200, income, "Income Created");
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const incomeData = await incomeService.findAll();
            successResponse(res, 200, incomeData, "Income fetched");
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    async findById(req, res, next) {
        const  id  = req.params.id;
        try {
            const incomeData = await incomeService.findById(id,req.user);
            if (incomeData === null) {
                throw new notFoundException("income")
            }
            successResponse(res, 200, incomeData, "Income fetched");
        } catch (err) {
            next(err);
        }
    }


    async update(req, res, next) {
        const { id } = req.params;
        try {
            const incomeData = await incomeService.update(req.body,id,req.user);
            successResponse(res, 200, incomeData, "Income updated");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const incomeData = await incomeService.delete(id,req.user);
            successResponse(res, 200, incomeData, "Income deleted");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new IncomeController;