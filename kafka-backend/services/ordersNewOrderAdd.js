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
  let dishes = [];
  const cart_items = msg.cart_items;
  for (let i = 0; i < cart_items.length; i += 1) {
    dishes.push({
      dish_id: cart_items[i].dish_id,
      dish_name: cart_items[i].title,
      quantity: cart_items[i].quantity,
      price: cart_items[i].price,
    });
  }
  const newOrder = new OrderDetails({
    restaurant_id: msg.restaurant_id,
    customer_name: msg.customerName,
    restaurant_name: msg.restaurant_name,
    restaurant_city: msg.restaurant_city,
    restaurant_image_file_path: msg.restaurant_image,
    customer_id: msg.customerId,
    order_status: msg.order_status,
    delivery_status: msg.delivery_status,
    order_total: msg.order_total,
    tax: msg.tax,
    delivery_cost: msg.delivery_cost,
    gratitude: msg.gratitude,
    sub_total: msg.sub_total,
    order_delivery_type: msg.order_delivery_type,
    order_address_line_1: msg.order_address_line_1,
    order_city: msg.order_city,
    order_state: msg.order_state,
    order_country: msg.order_country,
    order_zipcode: msg.order_zipcode,
    dishes: dishes,
    notes: msg.notes,
  });
  newOrder.save((err, data) => {
    if (err) {
      callback(null, {
        errCode: 400,
        data: { status: "ORDER_CREATION_FAILED" },
      });
      return;
    } else {
      OrderDetails.find(
        { customer_id: msg.customerId },
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
              status: "ORDER_CREATED",
              orders: addOrderIds(allorders),
            },
          });
          return;
        }
      );
    }
  });
}

exports.handle_request = handle_request;
