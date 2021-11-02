const { CustomerDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  CustomerDetails.find({ _id: msg.customer_id }, (err, restaurantdata) => {
    if (err) {
      callback(null, {
        errCode: 400,
        data: { status: "RESTAURANTS_NOT_FOUND" },
      });
      return;
    }
    callback(null, {
      data: {
        status: "RESTAURANT_DETAILS",
        restaurentDetails: restaurantdata,
      },
    });
    return;
  });
}

exports.handle_request = handle_request;
