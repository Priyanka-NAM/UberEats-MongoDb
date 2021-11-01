import {
  OWNER_PROFILE_UPLOAD,
  CUSTOMER_PROFILE_UPLOAD,
  DISH_IMAGE_UPLOAD,
} from "../Actions/types";

const intitalState = {
  owner_image_file_path: "",
  dish_image_file_path: "",
  customer_image_file_path: "",
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case OWNER_PROFILE_UPLOAD:
      return {
        ...state,
        owner_image_file_path: action.payload,
      };
    case CUSTOMER_PROFILE_UPLOAD:
      return {
        ...state,
        customer_image_file_path: action.payload,
      };
    case DISH_IMAGE_UPLOAD:
      return {
        ...state,
        dish_image_file_path: action.payload,
      };
    default:
      return state;
  }
};
