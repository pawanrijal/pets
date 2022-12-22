
const jwt = require("jsonwebtoken");
const UserService = require("../service/user.service");
const { tokenExpiredException } = require("../exceptions/tokenExpired.exception");
const passport = require("passport");
const AuthenticationException = require("../exceptions/authentication.exception");


const authenticationMiddleware = async (req, res, next) => {
    try {
        passport.authenticate("jwt", { session: false })
        if (req.headers.authorization === null || req.headers.authorization === undefined) {
            throw new AuthenticationException();
        }
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

        if (decoded.exp * 1000 < Date.now()) {
            throw new tokenExpiredException()
        }
        const user = await UserService.findById(decoded.sub);
        // req.user = user;
        // `user` is authorized pass the control to next middleware
        next();
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}


module.exports = authenticationMiddleware;








