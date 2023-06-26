const jwt = require("jsonwebtoken");
const { user } = require("../lib/database.connection");
const {
  tokenExpiredException,
} = require("../exceptions/tokenExpired.exception");

const AuthenticationException = require("../exceptions/authentication.exception");
const {
  sendNotification,
  checkTodayTarget,
} = require("../utils/sendNotification");
const dashboardService = require("../service/dashboard.service");
const targetService = require("../service/target.service");

const authenticationMiddleware = async (req, res, next) => {
  try {
    if (
      req.headers.authorization === null ||
      req.headers.authorization === undefined
    ) {
      throw new AuthenticationException();
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    if (decoded.exp * 1000 < Date.now()) {
      throw new tokenExpiredException();
    }
    const _user = await user.findByPk(decoded.sub);
    if (_user === null || _user === undefined) {
      throw new AuthenticationException();
    }
    req.user = _user;

    // send notification of user
    await sendNotification(_user);
    await checkTodayTarget(_user);

    await targetService.checkReachAmount(_user);
    // `user` is authorized pass the control to next middleware
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authenticationMiddleware;
