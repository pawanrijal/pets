const UserService = require("../service/user.service");
const successResponse = require("../utils/successResponse");
const IAes = require("../algorithm/aes");

require("dotenv").config();

class UserController {
  async signup(req, res, next) {
    try {
      // if (req.file) {
      //   req.body.profilePic = req.file.filename;

      // }
      const user = await UserService.create(req.body);
      successResponse(res, 200, user, "User Created");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (req.file) {
        // Aes.encrypt("big secret", "pāşšŵōřđ", 256);
        req.body.profilePic = IAes.encrypt(
          process.env.ENCRYPTION_SECRET,
          req.file.path,
          256
        );
      }
      const userData = await UserService.update(req.body, req.user);
      successResponse(res, 200, userData, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      successResponse(res, 200, data, "Logged in Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      const user = req.user;
      user.password = undefined;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      successResponse(res, 200, user, "User Profile");
    } catch (err) {
      next(err);
    }
  }
  async changePassword(req, res, next) {
    try {
      const userData = await UserService.changePassword(req.body);
      successResponse(res, 200, userData, "Password Changed");
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const response = await UserService.forgotPassword(
        req.headers.host,
        req.body
      );
      successResponse(res, 200, response, "Reset Email");
    } catch (err) {
      next(err);
    }
  }

  async verifyToken(req, res, next) {
    try {
      const id = req.params.id;
      const token = req.params.token;
      req.body.token = token;
      const response = await UserService.verifyToken(req.body, id);
      successResponse(res, 200, response, "Valid Url");
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const id = req.params.id;
      const token = req.params.token;
      req.body.token = token;
      const response = await UserService.resetPassword(req.body, id);
      successResponse(res, 200, response, "Password changed");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
