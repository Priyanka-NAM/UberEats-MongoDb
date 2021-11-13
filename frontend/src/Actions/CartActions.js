import {
  CART_ADD,
  CART_EMPTY,
  CART_ITEM_UPDATE,
  CART_ITEM_DELETE,
} from "./types";

export const addToCart = (itemDetails) => (dispatch) =>
  dispatch({ type: CART_ADD, payload: itemDetails });

export const emptyCart = (itemDetails) => (dispatch) =>
  dispatch({ type: CART_EMPTY, payload: itemDetails });

export const updateCart = (dishtitle, updateQuantity) => (dispatch) =>
  dispatch({ type: CART_ITEM_UPDATE, payload: { dishtitle, updateQuantity } });

export const deleteCartItem = (itemIndex) => (dispatch) =>
  dispatch({ type: CART_ITEM_DELETE, payload: { itemIndex } });
