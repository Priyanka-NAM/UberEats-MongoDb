import axios from "axios";

import {
  OWNER_PROFILE_UPLOAD,
  OWNER_PROFILE_UPLOAD_FAILURE,
  CUSTOMER_PROFILE_UPLOAD,
  CUSTOMER_PROFILE_UPLOAD_FAILURE,
  DISH_IMAGE_UPLOAD,
  DISH_IMAGE_UPLOAD_FAILURE,
} from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";

export const customerProfilePic = (data) => async (dispatch) => {
  try {
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: getToken(),
      },
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/fileUpload/profile_upload`,
      data,
      uploadConfig
    );
    const response = await res;
    // localStorage.setItem("jwtToken", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: CUSTOMER_PROFILE_UPLOAD,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_PROFILE_UPLOAD_FAILURE,
      payload: err.response,
    });
  }
};

export const ownerProfilePic = (data) => async (dispatch) => {
  try {
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: getToken(),
      },
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/fileUpload/profile_upload`,
      data,
      uploadConfig
    );
    const response = await res;
    // localStorage.setItem("jwtToken", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: OWNER_PROFILE_UPLOAD,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: OWNER_PROFILE_UPLOAD_FAILURE,
      payload: err.response,
    });
  }
};

export const dishProfilePic = (data) => async (dispatch) => {
  try {
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: getToken(),
      },
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/fileUpload/profile_upload`,
      data,
      uploadConfig
    );
    const response = await res;

    dispatch({
      type: DISH_IMAGE_UPLOAD,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: DISH_IMAGE_UPLOAD_FAILURE,
      payload: err.response,
    });
  }
};
