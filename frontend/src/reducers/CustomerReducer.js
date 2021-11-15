/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
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
  CUSTOMER_ORDER_UPDATE,
  CUSTOMER_ORDER_UPDATE_FAILURE,
  CUSTOMER_FAVORITES,
  CUSTOMER_FAVORITES_FAILURE,
  UPDATE_FAV,
  UPDATE_FAV_FAILURE,
  UPDATE_ORDER_PAGE_SIZE,
  UPDATE_ORDER_PAGE_NUMBER,
} from "../Actions/types";

const intitalState = {
  customerDetails: {},
  orders: {},
  neworder: {},
  fav: {},
  headerUserLocation: {},
  pagination: {
    pageSize: 5,
    currentPageNumber: 0,
  },
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
    case CUSTOMER_ORDER_UPDATE:
      return {
        ...state,
        neworder: action.payload,
      };
    case CUSTOMER_ORDER_UPDATE_FAILURE:
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
        // fav: action.payload,
      };
    case UPDATE_FAV:
      let filteredRestaurants = filterDeletedFavs(
        state.fav.favRestaurants,
        action.payload.favId
      );
      if (!filteredRestaurants) {
        filteredRestaurants = state.fav.favRestaurants;
      }
      return {
        ...state,
        fav: {
          status: "FAV_RESTAURANTS",
          favRestaurants: filteredRestaurants,
        },
      };
    case UPDATE_FAV_FAILURE:
      return {
        ...state,
      };
    case UPDATE_ORDER_PAGE_SIZE:
      return {
        ...state,
        pagination: {
          pageSize: action.payload,
          currentPageNumber: 0,
        },
      };
    case UPDATE_ORDER_PAGE_NUMBER:
      const currPageSize = state.pagination.pageSize;
      return {
        ...state,
        pagination: {
          pageSize: currPageSize,
          currentPageNumber: action.payload,
        },
      };
    default:
      return state;
  }
};
