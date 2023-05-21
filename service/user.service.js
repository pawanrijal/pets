const { user } = require("../lib/database.connection");
const bcrypt = require("bcrypt");
const {
  passwordMismatchException,
} = require("../exceptions/passwordMismatch.exception");
const {
  alreadyExistsException,
} = require("../exceptions/alreadyExists.exception");
const { notFoundException } = require("../exceptions/notFound.exception");

const generateToken = require("../utils/tokenGenerator");
const { SendMail } = require("../utils/sendMail");
const {
  tokenExpiredException,
} = require("../exceptions/tokenExpired.exception");
const { hashPassword } = require("../utils/hashPassword");
const { deleteImage } = require("../utils/image");
const IAes = require("../algorithm/aes");
class UserService {
  async create(payload) {
    let userData = await user.findOne({
      where: { username: payload.username },
    }); //fetch user
    let userDataEmail = await user.findOne({ where: { email: payload.email } }); //fetch user email
    if (userData == null && userDataEmail == null) {
      if (payload.password == payload.confirmPassword) {
        const { password } = payload;
        payload.password = await hashPassword(password);
        console.log(payload);
        const userData = await user.create(payload); //user create
        payload.password = hashPassword(password);
        // await userRole.create({ userId: userData.id, roleId: 2 });//create role for default customer
        userData.password = undefined;
        return userData;
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new alreadyExistsException("User");
    }
  }

  async update(payload, _user) {
    if (payload.password) {
      if (payload.oldPassword) {
        const compare = await bcrypt.compare(
          payload.oldPassword,
          _user.password
        ); //compare user password with payload password
        if (compare) {
          const { password } = payload;
          payload.password = hashPassword(password);
          const returnData = await user.update(payload, {
            where: { id: _user.id },
          });
          return returnData;
        } else {
          throw new Error("Password did not match with old password");
        }
      }
    }
    return await user.update(payload, {
      where: { id: _user.id },
    });
  }

  async findById(id) {
    const returnData = await user.findOne({ where: { id } });
    if (returnData === null) {
      throw new notFoundException("User");
    }
    return returnData;
  }

  async login(payload) {
    const { username, password } = payload;
    let _user = await user.findOne({ where: { username: username } });
    if (_user != null) {
      const compared = await bcrypt.compare(password, _user.password); //compare hashed password
      if (compared) {
        const token = generateToken(_user, 68400); //jwt token
        return { token: token };
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new notFoundException("User");
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
    const link = `http://localhost:5173/updatePassword/${_user.id}?token=${_user.resetPasswordToken}`;
    const html = `Hi ${_user.username} \n
      Please click on the following link <a href="${link}">click here</a> to reset your password. \n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`;
    const sendEmail = new SendMail(_user.email, "Password Reset Email", html);
    sendEmail.send();
    return true;
  }

  //verify token
  async verifyToken(payload, id) {
    const _user = await user.findOne({ where: { resetPasswordToken: payload.token, id: id } });
    if (!_user)
      throw new notFoundException("User");
    if (await this.checkExpiryDate(_user))
      throw new tokenExpiredException();
    return true;
  }


  //reset password
  async resetPassword(payload, id) {
    await this.verifyToken(payload.token, id);
    await this.verifyToken(payload.token, id);

    const _user = await this.findById(id);

    const { password } = payload;
    payload.password = hashPassword(password);
    payload.password = hashPassword(password);
    await user.update(payload, {
      where: { id: _user.id },
    });

    const html = `Hi ${_user.username} \n
        Your password has been successfully reset.`;
    const sendEmail = new SendMail(_user.email, "Password Reset Email", html);
    sendEmail.send();
    return true;
  }

  async checkExpiryDate(_user) {
    const expiryDate = _user.resetPasswordExpires;
    return expiryDate < new Date() ? true : false;
  }
}

module.exports = new UserService();
