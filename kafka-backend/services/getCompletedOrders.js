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
  OrderDetails.find(
    { restaurant_id: msg.restaurant_id, order_status: "Completed" },
    (err, data) => {
      if (err) {
        callback(null, {
          errCode: 400,
          data: { status: "NO_RESTAURANT_ID",}
        });
        return;
      }
      callback(null, {
        data: {
          status: "COMPLETED_ORDERS",
          orders: addOrderIds(data),
        },
      });
    }
  );
}

exports.handle_request = handle_request;
