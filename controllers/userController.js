const UserService = require("../service/userService");
const successResponse = require("../utils/successResponse");
const jwt = require("jsonwebtoken");
const AuthorizationException = require("../exceptions/authorizationException");

require("dotenv").config();

class UserController {
  async create(req, res, next) {
    try {
          const user=await UserService.create(req.body);
          successResponse(res, 200, user, "User Created");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if(req.headers.authorization===null||req.headers.authorization===undefined){
        throw new AuthorizationException();
      }
      const token = req.headers.authorization.split(" ")[1];
      const userData = await UserService.update(req.body, id,token);
      successResponse(res, 200, userData, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const userData = await UserService.findAll();
      successResponse(res, 200, userData, "User fetched");
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const userData = await UserService.findById(id);
      successResponse(res, 200, userData, "User fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    if(req.headers.authorization===null||req.headers.authorization===undefined){
      throw new AuthorizationException();
    }
    const token = req.headers.authorization.split(" ")[1];


    const id = req.params.id;
    try {
        const userData = await UserService.delete(id,token);
        successResponse(res, 200, userData, "User Deleted");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      successResponse(res,200,data,"Logged in Successfully")
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

      // console.log(decoded);
      const userData = await UserService.profile(decoded);
      successResponse(res, 200, userData, "User Profile");
    } catch (err) {
      next(err);
    }
  }
  async changePassword(req,res,next){
    try{
      const userData = await UserService.changePassword(req.body)
      successResponse(res, 200, userData, "Password Changed");
    }
    catch (err){
      next(err)
    }
  }
}




module.exports = new UserController();
