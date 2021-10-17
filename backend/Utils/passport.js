/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { secret } = require("./config");

const Model = require("./connection");

// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("x-auth-token"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      const userID = jwtPayload._id;
      Model.CustomerDetails.findById(userID, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("x-auth-token", { session: false });
