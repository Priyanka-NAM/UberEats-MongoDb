/* eslint-disable camelcase */
import axios from "axios";
import {
  CUSTOMER_SIGNUP,
  CUSTOMER_SIGNUP_FAILURE,
  CUSTOMER_UPDATE,
  CUSTOMER_UPDATE_FAILURE,
  CUSTOMER_ORDERS,
  CUSTOMER_ORDERS_FAILURE,
  CUSTOMER_NEWORDER,
  CUSTOMER_NEWORDER_FAILURE,
  CUSTOMER_FAVORITES,
  CUSTOMER_FAVORITES_FAILURE,
  UPDATE_FAV,
  UPDATE_FAV_FAILURE,
} from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";

export const addCustomer = (signupdata) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;

    const res = await axios.post(
      `${backendServer}/ubereats/signup/customer`,
      signupdata
    );
    const response = await res;
    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: CUSTOMER_SIGNUP,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_SIGNUP_FAILURE,
      payload: err.response,
    });
  }
};

export const updateCustomer = (customerUpdateData) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/profile/customer`,
      customerUpdateData
    );
    const response = await res;
    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: CUSTOMER_UPDATE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_UPDATE_FAILURE,
      payload: err.response,
    });
  }
};

export const customerOrders = () => async (dispatch) => {
  const { customer_id: customerId } = JSON.parse(localStorage.getItem("user"));
  try {
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = getToken();
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.get(
      `${backendServer}/ubereats/orders/orderstatus/customer/${customerId}`
    );
    const response = await res;
    dispatch({
      type: CUSTOMER_ORDERS,
      payload: response.data.orders,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ORDERS_FAILURE,
      payload: err.response,
    });
  }
};

export const customerOrderPlaced = (customerNewOrder) => async (dispatch) => {
  const { customer_id: customerId, name: customerName } = JSON.parse(
    localStorage.getItem("user")
  );
  if (!customerId) return;
  try {
    const postInput = { ...customerNewOrder, customerId, customerName };
    console.log("Inside Customer New Order Action");
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/orders/customer/neworder`,
      postInput
    );
    const response = await res;
    dispatch({
      type: CUSTOMER_NEWORDER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_NEWORDER_FAILURE,
      payload: err.response,
    });
  }
};

export const customerFav = () => async (dispatch) => {
  const { customer_id: customerId } = JSON.parse(localStorage.getItem("user"));
  try {
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = getToken();
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.get(
      `${backendServer}/ubereats/customerrestaurant/favourite/${customerId}`
    );
    const response = await res;
    console.log("fav response", response.data);
    dispatch({
      type: CUSTOMER_FAVORITES,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_FAVORITES_FAILURE,
      payload: err.response,
    });
  }
};

export const updateFav = (updateFavInput) => async (dispatch) => {
  const { customer_id: customerId } = JSON.parse(localStorage.getItem("user"));
  const newFavInput = { ...updateFavInput, customerId };
  try {
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = getToken();
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/customerrestaurant/updatefavourite`,
      newFavInput
    );
    const response = await res;
    console.log("Favorite Restaurants ", response.data);
    dispatch({
      type: UPDATE_FAV,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_FAV_FAILURE,
      payload: err.response,
    });
  }
};
