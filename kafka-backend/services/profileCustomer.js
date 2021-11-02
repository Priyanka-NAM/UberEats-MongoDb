const md5 = require("md5");
const { CustomerDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  const password = msg.password;
  const hashedPassword = md5(password);
  const UserUpdate = {
    $set: {
      is_owner: 0,
      name: msg.name,
      email_id: msg.email,
      password: hashedPassword,
      nick_name: msg.nick_name,
      phone_num: msg.phone_num,
      date_of_birth: msg.date_of_birth,
      address_line_1: msg.address_line_1,
      city: msg.city,
      state: msg.state,
      country: msg.country,
      zipcode: msg.zipcode,
      profile_pic_file_path: msg.profile_pic_file_path,
    },
  };
  CustomerDetails.updateOne(
    { _id: msg.customer_id },
    UserUpdate,
    (error, result) => {
      if (error) {
        callback(null, { errCode: 400, data: {status: "NO_CUSTOMER_ID" }});
        return;
      }
      CustomerDetails.findOne({ _id: msg.customer_id }, (err, customerdata) => {
        if (err) {
          callback(null, {
            errCode: 400,
            data: { status: "CANNOT_GET_UPDATED_CUSTOMER_DETAILS",}
          });
          return;
        }
        let modifiedCustomerData = JSON.parse(JSON.stringify(customerdata));
        modifiedCustomerData.customer_id = customerdata._id;
        callback(null, {
          data: {
            status: "CUSTOMER_UPDATED",
            user: modifiedCustomerData,
          },
        });
      });
    }
  );
}

exports.handle_request = handle_request;
