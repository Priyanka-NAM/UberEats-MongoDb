import axios from "axios";
import { ALL_RESTAURANTS, ALL_RESTAURANTS_FAILURE } from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";

export const restaurants = () => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = getToken();
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.get(
      `${backendServer}/ubereats/customerrestaurant/allrestaurants`
    );
    const response = await res;

    dispatch({
      type: ALL_RESTAURANTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_RESTAURANTS_FAILURE,
      payload: err.response,
    });
  }
};

export const searchRestaurants = (searchInput) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = getToken();
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.get(
      `${backendServer}/ubereats/customerrestaurant/restaurantsearch/${searchInput}`
    );
    const response = await res;

    dispatch({
      type: ALL_RESTAURANTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_RESTAURANTS_FAILURE,
      payload: err.response,
    });
  }
};
