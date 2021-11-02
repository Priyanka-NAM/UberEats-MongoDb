const { OrderDetails } = require("../Models/Models");

const addOrderIds = (orders) => {
  const modifiedOrders = orders.map((order) => {
    let modifiedOrder = JSON.parse(JSON.stringify(order));
    modifiedOrder.order_id = order._id;
    return modifiedOrder;
  });
  return modifiedOrders;
};

function handle_request(msg, callback) {
  OrderDetails.find({ customer_id: msg.customer_id }, (err, data) => {
    if (err) {
      callback(null, {
        errCode: 400,
        data: { status: "CUSTOMER_ID_NULL" },
      });
      return;
    }
    callback(null, {
      data: {
        status: "CUSTOMER_ORDERS",
        orders: addOrderIds(data),
      },
    });
  });
}

exports.handle_request = handle_request;
