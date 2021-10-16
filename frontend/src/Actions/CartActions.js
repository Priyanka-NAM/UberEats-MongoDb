import { CART_ADD, CART_EMPTY } from "./types";

export const addToCart = (itemDetails) => (dispatch) =>
  dispatch({ type: CART_ADD, payload: itemDetails });

export const emptyCart = (itemDetails) => (dispatch) =>
  dispatch({ type: CART_EMPTY, payload: itemDetails });
