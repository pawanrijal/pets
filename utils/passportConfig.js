var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const passport = require("passport");
const UserService = require("../service/userService");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JSON_WEB_TOKEN_SECRET;

const jwt = new JwtStrategy(opts, function (jwt_payload, done) {
  try {
    const id = jwt_payload.sub;
    const found_user = UserService.findById(id);
    if (found_user) {
      return done(null, found_user);
    }
    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});


module.exports = (passport) => {
  passport.use(jwt);
};
