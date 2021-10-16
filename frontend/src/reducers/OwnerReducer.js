/* eslint-disable no-case-declarations */
import {
  OWNER_SIGNUP,
  OWNER_UPDATE,
  OWNER_SIGNUP_FAILURE,
  OWNER_UPDATE_FAILURE,
  USER_SIGNIN_SUCCESS,
  OWNER_NEW_ORDER,
  OWNER_NEW_ORDER_FAILURE,
  OWNER_ORDER_UPDATE,
  OWNER_DELIVERED_ORDER,
  OWNER_DELIVERED_ORDER_FAILURE,
  OWNER_CANCELLED_ORDER,
  OWNER_CANCELLED_ORDER_FAILURE,
  OWNER_MENU,
  OWNER_MENU_FETCH_FAILURE,
  OWNER_MENU_UPDATE,
  OWNER_MENU_UPDATE_FAILURE,
  OWNER_MENU_ADD,
  OWNER_MENU_ADD_FAILURE,
  CUSTOMER_DETAILS,
  CUSTOMER_DETAILS_FETCH_FAILURE,
  OWNER_PROFILE_DETAILS,
  OWNER_PROFILE_DETAILS_FAILURE,
} from "../Actions/types";

const intitalState = {
  ownerDetails: {},
  newOrders: [],
  deliveredOrders: [],
  cancelledOrders: [],
  allDishes: [],
};
export default (state = intitalState, action) => {
  switch (action.type) {
    case OWNER_SIGNUP:
      return {
        ...state,
        ownerDetails: action.payload,
      };
    case OWNER_SIGNUP_FAILURE:
      return {
        ...state,
        ownerDetails: action.payload,
      };
    case OWNER_UPDATE:
      return {
        ...state,
        ownerDetails: action.payload,
      };

    case OWNER_UPDATE_FAILURE:
      let errMsg = "Internal Server Error";
      if (action.payload.data && action.payload.data.sqlMessage) {
        errMsg = action.payload.data.sqlMessage;
      }
      return {
        ...state,
        ownerDetails: { status: errMsg },
      };
    case USER_SIGNIN_SUCCESS:
      if (action.payload.user.is_owner === 1) {
        return {
          ...state,
          ownerDetails: action.payload,
        };
      }
      return state;

    case OWNER_NEW_ORDER:
      return {
        ...state,
        newOrders: action.payload,
      };
    case OWNER_NEW_ORDER_FAILURE:
      return {
        ...state,
        newOrders: action.payload,
      };
    case OWNER_ORDER_UPDATE:
      return {
        ...state,
        newOrders: action.payload,
      };
    case OWNER_DELIVERED_ORDER:
      return {
        ...state,
        deliveredOrders: action.payload,
      };
    case OWNER_DELIVERED_ORDER_FAILURE:
      return {
        ...state,
        deliveredOrders: action.payload,
      };
    case OWNER_CANCELLED_ORDER:
      return {
        ...state,
        cancelledOrders: action.payload,
      };
    case OWNER_CANCELLED_ORDER_FAILURE:
      return {
        ...state,
        cancelledOrders: action.payload,
      };
    case OWNER_MENU:
      return {
        ...state,
        allDishes: action.payload,
      };
    case OWNER_MENU_FETCH_FAILURE:
      return {
        ...state,
        allDishes: action.payload,
      };
    case OWNER_MENU_UPDATE:
      return {
        ...state,
        allDishes: action.payload,
      };
    case OWNER_MENU_UPDATE_FAILURE:
      return {
        ...state,
      };
    case OWNER_MENU_ADD:
      return {
        ...state,
        allDishes: action.payload,
      };
    case OWNER_MENU_ADD_FAILURE:
      return {
        ...state,
      };
    case CUSTOMER_DETAILS:
      return {
        ...state,
        CustomerDetails: action.payload,
      };
    case CUSTOMER_DETAILS_FETCH_FAILURE:
      return {
        ...state,
      };
    case OWNER_PROFILE_DETAILS:
      return {
        ...state,
        ownerDetails: action.payload,
      };
    case OWNER_PROFILE_DETAILS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
