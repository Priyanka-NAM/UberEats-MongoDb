import axios from "axios";
import {
  OWNER_SIGNUP,
  OWNER_SIGNUP_FAILURE,
  OWNER_UPDATE,
  OWNER_UPDATE_FAILURE,
  OWNER_NEW_ORDER,
  OWNER_NEW_ORDER_FAILURE,
  OWNER_ORDER_UPDATE,
  OWNER_ORDER_UPDATE_FAILURE,
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
} from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";

export const addOwner = (signupdata) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      `${backendServer}/ubereats/signup/owner`,
      signupdata
    );
    const response = await res;
    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: OWNER_SIGNUP,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: OWNER_SIGNUP_FAILURE,
      payload: err.response,
    });
  }
};

export const updateOwner = (ownerUpdateData) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/profile/owner`,
      ownerUpdateData
    );
    const response = await res;
    dispatch({
      type: OWNER_UPDATE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: OWNER_UPDATE_FAILURE,
      payload: err.response,
    });
  }
};

export const ownerNewOrders = () => async (dispatch) => {
  const { restaurant_id: restaurantId } = JSON.parse(
    localStorage.getItem("user")
  );
  console.log(" restaurantId: ", restaurantId);
  if (!restaurantId) return;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-auth-token"] = getToken();
  axios
    .get(
      `${backendServer}/ubereats/orders/neworders/restaurant/${restaurantId}`
    )
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));

      if (response.data.status === "NEW_ORDERS") {
        dispatch({
          type: OWNER_NEW_ORDER,
          payload: response.data.orders,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: OWNER_NEW_ORDER_FAILURE,
          payload: error.response.data,
        });
      }
    });
};

export const ownerNewOrdersUpdate =
  (updateOrderDetails) => async (dispatch) => {
    const { restaurant_id: restaurantId } = JSON.parse(
      localStorage.getItem("user")
    );
    console.log(" restaurantId: ", restaurantId);
    // if (!restaurantId) return;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    axios
      .post(
        `${backendServer}/ubereats/orders/neworders/update`,
        updateOrderDetails
      )
      .then((response) => {
        if (response.data.status === "UPDATED_ORDER") {
          dispatch({
            type: OWNER_ORDER_UPDATE,
            payload: response.data.orders,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: OWNER_ORDER_UPDATE_FAILURE,
            payload: error.response.data,
          });
        }
      });
  };

export const ownerDeliveredOrders = () => async (dispatch) => {
  const { restaurant_id: restaurantId } = JSON.parse(
    localStorage.getItem("user")
  );
  if (!restaurantId) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();
  axios
    .get(
      `${backendServer}/ubereats/orders/completedorders/restaurant/${restaurantId}`
    )
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));

      if (response.data.status === "COMPLETED_ORDERS") {
        dispatch({
          type: OWNER_DELIVERED_ORDER,
          payload: response.data.orders,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: OWNER_DELIVERED_ORDER_FAILURE,
          payload: error.response,
        });
      }
    });
};

export const ownerCancelledOrders = () => async (dispatch) => {
  const { restaurant_id: restaurantId } = JSON.parse(
    localStorage.getItem("user")
  );

  console.log(" restaurantId: ", restaurantId);
  if (!restaurantId) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .get(
      `${backendServer}/ubereats/orders/cancelledorders/restaurant/${restaurantId}`
    )
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));
      if (response.data.status === "CANCELLED_ORDERS") {
        dispatch({
          type: OWNER_CANCELLED_ORDER,
          payload: response.data.orders,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: OWNER_CANCELLED_ORDER_FAILURE,
          payload: error.response,
        });
      }
    });
};

export const ownerMenu = () => async (dispatch) => {
  const { restaurant_id: restaurantId } = JSON.parse(
    localStorage.getItem("user")
  );
  console.log(" restaurantId: ", restaurantId);
  if (!restaurantId) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .get(`${backendServer}/ubereats/dishes/alldishes/${restaurantId}`)
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));

      if (response.data.status === "ALL_DISHES") {
        dispatch({
          type: OWNER_MENU,
          payload: response.data.allDishes,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: OWNER_MENU_FETCH_FAILURE,
          payload: error.response.data,
        });
      }
    });
};

export const ownerMenuUpdate = (dishdata) => async (dispatch) => {
  console.log("Inside ownerMenuUpdate Action from Menu Update ", dishdata);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .post(`${backendServer}/ubereats/dishes/updatedish`, dishdata)
    .then((response) => {
      console.log("Response for dish update ", response.data);
      if (response.data.status === "DISH_UPDATED") {
        dispatch({
          type: OWNER_MENU_UPDATE,
          payload: response.data.allDishes,
        });
      } else {
        dispatch({
          type: OWNER_MENU_UPDATE_FAILURE,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: OWNER_MENU_UPDATE_FAILURE,
        payload: error.response,
      });
    });
};

export const ownerMenuAdd = (dishdata) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .post(`${backendServer}/ubereats/dishes/adddish`, dishdata)
    .then((response) => {
      if (response.data.status === "DISH_ADDED") {
        dispatch({
          type: OWNER_MENU_ADD,
          payload: response.data.allDishes,
        });
      } else {
        dispatch({
          type: OWNER_MENU_ADD_FAILURE,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      console.log("*********************", JSON.stringify(error));
      console.log("*********************", JSON.stringify(error.response));
      dispatch({
        type: OWNER_MENU_UPDATE_FAILURE,
        payload: error.response,
      });
    });
};

export const getUserDetails = (customerId) => async (dispatch) => {
  if (!customerId) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .get(`${backendServer}/ubereats/owner/customerdetails/${customerId}`)
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));

      if (response.data.status === "CUSTOMER_DETAILS") {
        dispatch({
          type: CUSTOMER_DETAILS,
          payload: response.data.customerDetails,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: CUSTOMER_DETAILS_FETCH_FAILURE,
          payload: error.response,
        });
      }
    });
};

export const getOwnerProfile = () => async (dispatch) => {
  const { restaurant_id: restaurantId } = JSON.parse(
    localStorage.getItem("user")
  );
  if (!restaurantId) return;
  // axios.defaults.headers.common.authorization = getToken();
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .get(`${backendServer}/ubereats/profile/owner/details/${restaurantId}`)
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));

      if (response.data.status === "OWNER_PROFILE_DETAILS") {
        dispatch({
          type: OWNER_PROFILE_DETAILS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: OWNER_PROFILE_DETAILS_FAILURE,
          payload: error.response,
        });
      }
    });
};
