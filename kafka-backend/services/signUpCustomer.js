const jwt = require("jsonwebtoken");
const md5 = require("md5");
const { secret } = require("../Utils/config");
const { CustomerDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  console.log("SignUp Request for Kafka Backend ==> ", msg);
  const email = msg.email;
  const password = msg.password;
  const hashedPassword = md5(password);
  const newUser = new CustomerDetails({
    is_owner: 0,
    name: msg.name,
    email_id: msg.email,
    password: hashedPassword,
    address_line_1: msg.address_line_1,
    city: msg.city,
    state: msg.state,
    country: msg.country,
    zipcode: msg.zipcode,
  });
  CustomerDetails.findOne({ email_id: email }, (error, result) => {
    if (error) {
      //   console.log("Fetching CustomerDetails  error in SignUp request handler");
      callback(null, { errCode: 500, data: {} });
      return;
    }
    if (result) {
      callback(null, { errCode: 400, data: { status: "USER_EXISTS" } });
      return;
    } else {
      newUser.save((err, data) => {
        if (err) {
          callback(null, { errCode: 500, data: {} });
          return;
        } else {
          let modifiedData = JSON.parse(JSON.stringify(data));
          modifiedData.customer_id = data._id;
          const token = jwt.sign({ _id: data }, secret);
          callback(null, {
            data: {
              status: "USER_ADDED",
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
