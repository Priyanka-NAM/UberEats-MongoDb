const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CustomerDetails = new Schema({
  name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
  },
  address_line_1: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  nick_name: {
    type: String,
  },
  phone_num: {
    type: Number,
  },
  profile_pic_file_path: {
    type: String,
  },
  OrderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderDetails" }],
  favorite_restaurants: { type: Array },
});

const OrderDetails = new Schema({  
  order_status: {
    type: String,
  },
  delivery_status: {
    type: String,
  },
  order_total: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  delivery_cost: {
    type: Number,
  },
  gratitude: {
    type: Number,
  },
  sub_total: {
    type: Number,
  },
  create_time: { type: Date, default: Date.now() },
  update_time: { type: Date, default: Date.now() },
  order_delivery_type: {
    type: String,
  },
  order_address_line_1: {
    type: String,
  },
  order_city: {
    type: String,
  },
  order_state: {
    type: String,
  },
  order_country: {
    type: String,
  },
  order_zipcode: {
    type: Number,
  },
  customer_id: { type: Schema.Types.ObjectId, ref: "CustomerDetails" },
  restaurant_id: { type: Schema.Types.ObjectId, ref: "RestaurantDetails" },
  cart_items: [
    { dish_id: String, dish_name: String, quantity: Number, price: Number },
  ],
});

const RestaurantDetails = new Schema({
  name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  restaurant_address_line_one: {
    type: String,
  },
  restaurant_city: {
    type: String,
  },
  restaurant_state: {
    type: String,
  },
  restaurant_country: {
    type: String,
  },
  restaurant_zipcode: {
    type: Number,
  },
  image_file_path: {
    type: String,
  },
  phone_num: {
    type: Number,
  },
  restaurant_start_time: {
    type: String,
  },
  restaurant_end_time: {
    type: String,
  },
  restaurant_week_start: {
    type: String,
  },
  restaurant_week_end: {
    type: String,
  },
  national_brand: {
    type: String,
  },
  delivery_type: {
    type: String,
  },
  Dishes: [
    {
      dishId: { type: Schema.Types.ObjectId, ref: "Dishes" },
    },
  ],
});

const Dishes = new Schema({
  dishname: {
    type: String,
  },
  dishdescription: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  price: {
    type: Number,
  },
  image_file_path: {
    type: String,
  },
  dishcategory: {
    type: String,
  },
  dishtype: {
    type: String,
  },
  restaurant_id: { type: Schema.Types.ObjectId, ref: "RestaurantDetails" },
  dish_start_time: {
    type: String,
  },
  dish_end_time: {
    type: String,
  },
  isActive: {
    type: String,
  },
  create_time: { type: Date, default: Date.now() },
  update_time: { type: Date, default: Date.now() },
});

module.exports = {
  CustomerDetails: model("CustomerDetails", CustomerDetails),
  OrderDetails: model("OrderDetails", OrderDetails),
  RestaurantDetails: model("RestaurantDetails", RestaurantDetails),
  Dishes: model("Dishes", Dishes),
};
