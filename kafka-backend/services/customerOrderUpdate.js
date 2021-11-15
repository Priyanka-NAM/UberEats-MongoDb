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
  const OrderUpdate = {
    $set: {
      order_status: msg.order_status,
      delivery_status: msg.delivery_status,
      restaurant_id: msg.restaurant_id,
      customer_id: msg.customer_id,
      order_id: msg.order_id,
    },
  };
  OrderDetails.updateOne(
    { _id: msg.order_id },
    OrderUpdate,
    (error, result) => {
      if (error) {
        callback(null, { errCode: 400, data: { status: "NO_ORDER_ID" } });
        return;
      }
      OrderDetails.findOne({ _id: msg.order_id }, (err, data) => {
        if (err) {
          callback(null, {
            errCode: 400,
            data: { status: "NO_RESTAURANT_ID" },
          });
          return;
        }
        OrderDetails.find(
          { customer_id: msg.customer_id },
          (finderr, allorders) => {
            if (finderr) {
              callback(null, {
                errCode: 400,
                data: { status: "CUSTOMER_ID_NULL" },
              });
              return;
            }
            callback(null, {
              data: {
                status: "CUSTOMER_UPDATED_ORDER",
                orders: addOrderIds(allorders),
              },
            });
          }
        );
      });
    }
  );
}

exports.handle_request = handle_request;
