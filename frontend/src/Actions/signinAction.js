import axios from "axios";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNOUT,
} from "./types";
import backendServer from "../backEndConfig";

export const userSignin = (signindata) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      `${backendServer}/ubereats/signin`,
      signindata
    );
    const response = await res;
    console.log(" for user", response.data.user);
    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAILURE,
      payload: err.response,
    });
  }
};
// SignOut Action
export const userSignOut = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_SIGNOUT });
};
