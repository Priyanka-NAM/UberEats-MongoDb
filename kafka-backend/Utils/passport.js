const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { secret } = require("./config");
const { CustomerDetails, RestaurantDetails } = require("../Models/Models");

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
  secretOrKey: secret,
};
passport.use(
  new JwtStrategy(opts, (jwtPayload, callback) => {
    const userID = jwtPayload._id._id;
    const email_id = jwtPayload._id.email_id;
    const isOwner = jwtPayload._id.is_owner;
    console.log("UserId ", userID, " and isOwner ", isOwner);
    if (isOwner === 1) {
      RestaurantDetails.findOne({ email_id: email_id }, (err, results) => {
        if (err) {
          console.log("Error ====== >> ", err);
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    } else {
      CustomerDetails.findOne({ email_id: email_id }, (err, results) => {
        if (err) {
          console.log("Error ====== >> ", err);
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }
  })
);

// exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
