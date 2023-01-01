const UserService = require("../service/user.service");
const successResponse = require("../utils/successResponse");
const jwt = require("jsonwebtoken");

require("dotenv").config();

class UserController {
  async signup(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      successResponse(res, 200, user, "User Created");
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const userData = await UserService.update(req.body, req.user);
      successResponse(res, 200, userData, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      successResponse(res, 200, data, "Logged in Successfully")
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      const user = req.user;
      user.password = undefined;
      successResponse(res, 200, user, "User Profile");
    } catch (err) {
      next(err);
    }
  }
  async changePassword(req, res, next) {
    try {
      const userData = await UserService.changePassword(req.body)
      successResponse(res, 200, userData, "Password Changed");
    }
    catch (err) {
      next(err)
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const response = await UserService.forgotPassword(req.headers.host, req.body)
      successResponse(res, 200, response, "Reset Email");
    }
    catch (err) {
      next(err)
    }
  }


  async reset(req, res, next) {
    try {
      const response = await UserService.reset(req.body);
      successResponse(res, 200, response, "Password changed");
    }
    catch (err) {
      next(err)
    }
  }
}




module.exports = new UserController();
