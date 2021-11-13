/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import {
  CART_ADD,
  CART_EMPTY,
  CART_ITEM_UPDATE,
  CART_ITEM_DELETE,
} from "../Actions/types";

const intitalState = {
  restaurantName: "",
  restaurantImage: "",
  DeliveryMode: "",
  restaurnatId: -1,
  items: [],
};

const addItemsWithoutDuplicates = (cartItems, itemDetails) => {
  const items = [...cartItems];
  let currentIdx = -1;
  for (let idx = 0; idx < items.length; idx += 1) {
    if (items[idx].dishDetails.dish_id === itemDetails.dishDetails.dish_id) {
      currentIdx = idx;
      break;
    }
  }
  if (currentIdx === -1) {
    items.push(itemDetails);
  } else {
    items[currentIdx].quantity =
      parseInt(items[currentIdx].quantity, 10) +
      parseInt(itemDetails.quantity, 10);
    items[currentIdx].price = (
      parseInt(items[currentIdx].quantity, 10) *
      parseFloat(items[currentIdx].dishDetails.price)
    ).toFixed(2);
  }
  return items;
};

export default (state = intitalState, action) => {
  const { restaurantId } = state;
  switch (action.type) {
    case CART_ADD:
      if (action.payload.restaurantId !== restaurantId) {
        console.log(
          "Dish Details in Cart Reducer ",
          action.payload.itemDetails
        );
        return {
          restaurant_city: action.payload.restaurant_city,
          restaurantName: action.payload.restaurantName,
          restaurantImage: action.payload.restaurantImage,
          restaurantId: action.payload.restaurantId,
          DeliveryMode: action.payload.DeliveryMode,
          items: [action.payload.itemDetails],
        };
      }
      const newItems = addItemsWithoutDuplicates(
        state.items,
        action.payload.itemDetails
      );
      return {
        restaurant_city: action.payload.restaurant_city,
        restaurantName: action.payload.restaurantName,
        restaurantImage: action.payload.restaurantImage,
        restaurantId: action.payload.restaurantId,
        DeliveryMode: action.payload.DeliveryMode,
        items: newItems,
      };
    case CART_EMPTY:
      return intitalState;
    case CART_ITEM_UPDATE:
      const prevItems = state.items;
      const updatedItems = prevItems.map((item) => {
        if (item.title === action.payload.dishtitle) {
          item.quantity = action.payload.updateQuantity;
          item.price = (
            parseInt(item.quantity, 10) * parseFloat(item.dishDetails.price)
          ).toFixed(2);
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
      };
    case CART_ITEM_DELETE:
      const delItems = state.items;
      delItems.splice(action.payload.itemIndex, 1);
      return {
        ...state,
        items: delItems,
      };

    default:
      return state;
  }
};
