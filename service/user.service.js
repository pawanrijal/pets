const { user } = require("../lib/database.connection");
const bcrypt = require("bcrypt");
const { passwordMismatchException } = require("../exceptions/passwordMismatch.exception")
const { alreadyExistsException } = require("../exceptions/alreadyExists.exception")
const { notFoundException } = require("../exceptions/notFound.exception")

const generateToken = require("../utils/tokenGenerator");
const { SendMail } = require("../utils/sendMail");
const { TokenExpiredError } = require("jsonwebtoken");
class UserService {
  async create(payload) {
    let userData = await user.findOne({ where: { username: payload.username } });//fetch user
    let userDataEmail = await user.findOne({ where: { email: payload.email } });//fetch user email

    if (userData == null && userDataEmail == null) {
      if (payload.password == payload.confirm_password) {
        const saltRounds = 10;//password hash
        const { password } = payload;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        payload.password = hash;
        const userData = await user.create(payload)//user create
        // await userRole.create({ userId: userData.id, roleId: 2 });//create role for default customer
        userData.password = undefined;
        return userData;
      } else {
        throw new passwordMismatchException();
      }
    }
    else {
      throw new alreadyExistsException("User");
    }
  }

  async update(payload, user) {
    if (payload.password) {
      if (payload.oldPassword) {
        const saltRounds = 10;
        const compare = await bcrypt.compare(payload.oldPassword, user.password);//compare user password with payload password
        if (compare) {
          const salt = await bcrypt.genSalt(saltRounds)
          const hash = await bcrypt.hash(payload.password, salt)
          payload.password = hash;
          const returnData = await user.update(payload, {
            where: { id: user.id },
          });
          return returnData;
        }
        else {
          throw new Error("Password did not match with old password");
        }
      } else {
        throw new notFoundException("Please enter old password");
      }
    }
    else {
      return await user.update(payload, {
        where: { id: user.id },
      });
    }
  }

  async findById(id) {
    const returnData = await user.findOne({ where: { id } });
    if (returnData === null) {
      throw new notFoundException("User")
    }
    return returnData;
  }


  async login(payload) {
    const { username, password } = payload;
    let _user = await user.findOne({ where: { username: username } });
    if (_user != null) {
      const compared = await bcrypt.compare(password, _user.password);//compare hashed password
      if (compared) {
        const token = generateToken(_user, 68400);//jwt token
        return { token: token };
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new notFoundException("User")
    }
  }

  async forgotPassword(host, payload) {
    const _user = await user.findOne({ where: { email: payload.email } });
    if (!_user) {
      throw new notFoundException("User with this email");
    }
    _user.resetPasswordToken = generateToken(user, 68400);
    _user.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
    await _user.save();
    const link = `http://${host}/api/auth/reset/${_user.resetPasswordToken}`;
    const html = `Hi ${_user.username} \n
      Please click on the following link <a href="${link}">${link}</a> to reset your password. \n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`;
    const sendEmail = new SendMail(_user.email, "Password Reset Email", html);
    sendEmail.send();
    return true;
  }

  async reset(payload) {
    try {
      const user = await user.findOne({ where: { resetPasswordToken: payload.token, resetPasswordExpires: { $gt: Date.now() } } });
      if (!user) {
        throw new TokenExpiredError();
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save();
      const html = `Hi ${user.username} \n 
      This is a confirmation that the password for your account ${user.email} has just been changed.\n`;
      const sendEmail = new SendMail(user.email, "Password Reset Email", html);
      sendEmail.send();
      return true;
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = new UserService();
