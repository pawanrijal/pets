const { user, userRole, role } = require("../lib/databaseConnection");
const bcrypt = require("bcrypt");
const { passwordMismatchException } = require("../exceptions/passwordMismatchException")
const { alreadyExistsException } = require("../exceptions/alreadyExistsException")
const { notFoundException } = require("../exceptions/notFoundException")
const AuthorizationException = require("../exceptions/authorizationException");

const generateToken = require("../utils/tokenGenerator");
const jwt = require("jsonwebtoken");
const { tokenExpiredException } = require("../exceptions/tokenExpiredException");
class UserService {
  async create(payload) {
    //check profile pic of user
    if (payload.file != undefined) {

      payload.profile_pic = payload.files;
    }
    let userData = await user.findOne({ where: { username: payload.username } });//fetch user
    if (userData == null) {
      if (payload.password == payload.confirm_password) {
        const saltRounds = 10;//password hash
        const { password } = payload;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        payload.password = hash;
        const userData = await user.create(payload)//user create
        await userRole.create({ userId: userData.id, roleId: 2 });//create role for default customer
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

  async update(payload, id, token) {
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    if (decoded.exp * 1000 < Date.now()) {//expiration check
      throw new tokenExpiredException()
    }
    //check id and token id
    if (id != decoded.sub) {
      throw new AuthorizationException()
    }
    let userData = await user.findOne({ where: { id } });
    let _user = await user.findOne({ where: { username: payload.username } })

    if (userData != null) {//check if user exists
      if (_user != null) {//check if username exists
        throw new alreadyExistsException("Username")
      }

      const saltRounds = 10;
      const { password } = payload;
      if (password != null) {//if password given then hash
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        payload.password = hash;
      }

      const returnData = user.update(payload, {
        where: { id },
      });
      return returnData;

    }
    else {
      throw new notFoundException("User");
    }
  }


  async findAll() {
    const returnData = await user.findAll({ attributes: { exclude: ["password", "createdAt", "updatedAt"] } });
    return returnData;
  }

  async findById(id) {
    const returnData = await user.findOne({ where: { id } });
    if (returnData === null) {
      throw new notFoundException("User")
    }
    return returnData;
  }
  async delete(id, token) {
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    if (decoded.exp * 1000 < Date.now()) {
      throw new tokenExpiredException()
    }
    let _user = await this.findById(decoded.sub);//get user
    if (_user.roleId != 1) {//check if user is admin
      throw new AuthorizationException();
    }

    let userData = await this.findById(id);

    if (userData === null) {
      throw new notFoundException("User")
    }
    const returnData = await user.destroy({ where: { id } });
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

  async profile(decoded) {

    //get user data
    let _user = await user.findOne({
      where: {
        id: decoded.sub,
      },
      include: { model: role },
    });
    return _user;
  }

  async changePassword(payload) {
    const decoded = payload.decoded
    const user = await this.findById(decoded.sub);
    const oldPassword = payload.oldPassword
    const password = user.password
    const compare = await bcrypt.compare(oldPassword, password)//comparing old password with user
    if (compare) {
      const data = await this.update(payload, decoded.sub)
      return data
    }
    else {
      throw new passwordMismatchException()
    }
  }

}




module.exports = new UserService();
