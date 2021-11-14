var connection = new require("./kafka/Connection");
const mongo_connection = require("./Utils/connection");

//topics files

var signIn = require("./services/signIn");
var signUpCustomer = require("./services/signUpCustomer");
var signUpOwner = require("./services/signUpOwner");
var profileCustomer = require("./services/profileCustomer");
var profileOwner = require("./services/profileOwner");
var getOwnerRestaurantDetails = require("./services/getOwnerRestaurantDetails");

var dishesAddDish = require("./services/dishesAddDish");
var dishesUpdateDish = require("./services/dishesUpdateDish");
var getAllDishes = require("./services/getAllDishes");
var getCancelledOrders = require("./services/getCancelledOrders");
var getCompletedOrders = require("./services/getCompletedOrders");
var getNewOrders = require("./services/getNewOrders");
var getOrderStatus = require("./services/getOrderStatus");
var getOwnerCustomerDetails = require("./services/getOwnerCustomerDetails");
var ordersNewOrderAdd = require("./services/ordersNewOrderAdd");
var ordersNewOrderUpdate = require("./services/ordersNewOrderUpdate");
var getAllRestaurants = require("./services/getAllRestaurants");
var getSearchRestaurants = require("./services/getSearchRestaurants");
var getRestaurantDetails = require("./services/getRestaurantDetails");
var getFavouriteRestaurants = require("./services/getFavouriteRestaurants");
var updateFavoriteRestaurants = require("./services/updateFavoriteRestaurants");

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  // console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        if (err) {
          // console.log("Sending back response error ==> ", JSON.stringify(err));
        }
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
handleTopicRequest("signIn", signIn);
handleTopicRequest("signUpCustomer", signUpCustomer);
handleTopicRequest("signUpOwner", signUpOwner);
handleTopicRequest("profileCustomer", profileCustomer);
handleTopicRequest("profileOwner", profileOwner);
handleTopicRequest("getOwnerRestaurantDetails", getOwnerRestaurantDetails);

handleTopicRequest("dishesAddDish", dishesAddDish);
handleTopicRequest("dishesUpdateDish", dishesUpdateDish);
handleTopicRequest("getAllDishes", getAllDishes);
handleTopicRequest("getCancelledOrders", getCancelledOrders);
handleTopicRequest("getCompletedOrders", getCompletedOrders);
handleTopicRequest("getNewOrders", getNewOrders);
handleTopicRequest("getOrderStatus", getOrderStatus);
handleTopicRequest("getOwnerCustomerDetails", getOwnerCustomerDetails);
handleTopicRequest("ordersNewOrderAdd", ordersNewOrderAdd);
handleTopicRequest("ordersNewOrderUpdate", ordersNewOrderUpdate);

handleTopicRequest("getAllRestaurants", getAllRestaurants);
handleTopicRequest("getSearchRestaurants", getSearchRestaurants);
handleTopicRequest("getRestaurantDetails", getRestaurantDetails);
handleTopicRequest("getFavouriteRestaurants", getFavouriteRestaurants);
handleTopicRequest("updateFavoriteRestaurants", updateFavoriteRestaurants);
