const { CustomerDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  CustomerDetails.findOne({ _id: msg.customer_id }, (err, data) => {
    if (err || !data) {
      callback(null, {
        errCode: 400,
        data: { status: "CUSTOMER_DETAILS_FETCH_FAILURE" },
      });
      return;
    }
    let modifiedData = JSON.parse(JSON.stringify(data));
    modifiedData.customer_id = data._id;

    callback(null, {
      data: {
        status: "CUSTOMER_DETAILS",
        customerDetails: modifiedData,
      },
    });
    return;
  });
}

exports.handle_request = handle_request;
