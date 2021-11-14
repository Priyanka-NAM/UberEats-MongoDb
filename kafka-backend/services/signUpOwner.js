const jwt = require("jsonwebtoken");
const md5 = require("md5");
const { secret } = require("../Utils/config");
const { RestaurantDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  console.log("SignUp Request for Kafka Backend ==> ", msg);
  const email = msg.email;
  const password = msg.password;
  const hashedPassword = md5(password);
  const newUser = new RestaurantDetails({
    is_owner: 1,
    name: msg.name,
    email_id: msg.email,
    password: hashedPassword,
    restaurant_address_line_one: msg.restaurant_address_line_one,
    restaurant_city: msg.restaurant_city,
    restaurant_state: msg.restaurant_state,
    restaurant_country: msg.restaurant_country,
    restaurant_zipcode: msg.restaurant_zipcode,
    delivery_type: "Both",
  });
  RestaurantDetails.findOne({ email_id: email }, (error, result) => {
    if (error) {
      callback(null, { errCode: 500, data: {} });
      return;
    }
    if (result) {
      callback(null, {
        errCode: 400,
        data: { status: "RESTAURANT_ALREADY_EXISTS" },
      });
      return;
    } else {
      newUser.save((err, data) => {
        if (err) {
          callback(null, { errCode: 500, data: {} });
          return;
        } else {
          let modifiedData = JSON.parse(JSON.stringify(data));
          modifiedData.restaurant_id = data._id;
          const token = jwt.sign({ _id: data }, secret);
          callback(null, {
            data: {
              status: "RESTAURANT_ADDED",
              user: modifiedData,
              token,
            },
          });
        }
      });
    }
  });
}

exports.handle_request = handle_request;
