const transactionService=require("../service/transaction.service");
const successResponse = require("../utils/successResponse");

class TransactionController{
    async create(req, res, next) {
        try {
          const user=await req.user;
          const transaction = await transactionService.create(req.body,user);
          successResponse(res, 200, transaction, "Transaction Created");
        } catch (err) {
          next(err);
        }
      }
    
      async update(req, res, next) {
        try {
          const {id}=req.params
          const transactionData = await transactionService.update(req.body,id,await req.user);
          successResponse(res, 200, transactionData, "Transaction updated");
        } catch (err) {
          next(err);
        }
      }
    
      async findAll(req, res, next) {
        try {
          const transactionData = await transactionService.findAll(req.user);
          successResponse(res, 200, transactionData, "Transaction fetched");
        } catch (err) {
          next(err);
        }
      }
    
      async findById(req, res, next) {
        const { id } = req.params;
        try {
          const transactionData = await transactionService.findById(id,req.user);
          successResponse(res, 200, transactionData, "Transaction fetched");
        } catch (err) {
          next(err);
        }
      }
    
      async delete(req, res, next) {
        try {
          const transactionData = await transactionService.delete(req.body.transactionId,req.user);
          successResponse(res, 200, transactionData, "Transaction Deleted");
        } catch (err) {
          next(err);
        }
      }

}

module.exports=new TransactionController;