import {
  CUSTOMER_SIGNUP,
  CUSTOMER_SIGNUP_FAILURE,
  CUSTOMER_UPDATE,
  CUSTOMER_UPDATE_FAILURE,
  CUSTOMER_ORDERS,
  CUSTOMER_ORDERS_FAILURE,
  USER_SIGNIN_SUCCESS,
  CUSTOMER_NEWORDER,
  CUSTOMER_NEWORDER_FAILURE,
  CUSTOMER_FAVORITES,
  CUSTOMER_FAVORITES_FAILURE,
  UPDATE_FAV,
  UPDATE_FAV_FAILURE,
} from "../Actions/types";

const intitalState = {
  customerDetails: {},
  orders: {},
  neworder: {},
  fav: {},
  headerUserLocation: {},
};

const filterDeletedFavs = (favs, favId) =>
  favs.filter((fav) => fav.favorite_id !== favId);

export default (state = intitalState, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      if (action.payload.user.is_owner === 0) {
        return {
          ...state,
          customerDetails: action.payload,
        };
      }
      return state;
    case CUSTOMER_SIGNUP:
      return {
        ...state,
        customerDetails: action.payload,
      };
    case CUSTOMER_SIGNUP_FAILURE:
      return {
        ...state,
        customerDetails: action.payload,
      };
    case CUSTOMER_UPDATE:
      return {
        ...state,
        customerDetails: action.payload,
      };
    case CUSTOMER_UPDATE_FAILURE:
      return {
        ...state,
        customerDetails: action.payload,
      };
    case CUSTOMER_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case CUSTOMER_ORDERS_FAILURE:
      return {
        ...state,
        orders: action.payload,
      };
    case CUSTOMER_NEWORDER:
      return {
        ...state,
        neworder: action.payload,
      };
    case CUSTOMER_NEWORDER_FAILURE:
      return {
        ...state,
        neworder: action.payload,
      };
    case CUSTOMER_FAVORITES:
      return {
        ...state,
        fav: action.payload,
      };
    case CUSTOMER_FAVORITES_FAILURE:
      return {
        ...state,
        fav: action.payload,
      };
    case UPDATE_FAV:
      return {
        ...state,
        fav: filterDeletedFavs(state.fav, action.payload.favId),
      };
    case UPDATE_FAV_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
