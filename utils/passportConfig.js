// var JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;

const { user } = require("../lib/database.connection");
// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JSON_WEB_TOKEN_SECRET;
const BearerStrategy=require("passport-http-bearer").Strategy; //    
const bearerStrategy = new BearerStrategy(
 function(token, done) {
   user.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
)


module.exports = (passport) => {
  passport.use(bearerStrategy);
};
