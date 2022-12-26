const { user } = require("../lib/database.connection");
const bcrypt = require("bcrypt");
const { passwordMismatchException } = require("../exceptions/passwordMismatch.exception")
const { alreadyExistsException } = require("../exceptions/alreadyExists.exception")
const { notFoundException } = require("../exceptions/notFound.exception")

const generateToken = require("../utils/tokenGenerator");
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
        const token = generateToken(_user);//jwt token
        return { token: token };
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new notFoundException("User")
    }
  }

}

module.exports = new UserService();
