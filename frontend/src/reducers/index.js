import { combineReducers } from "redux";
import signinReducer from "./signinReducer";
import OwnerReducer from "./OwnerReducer";
import CustomerReducer from "./CustomerReducer";
import CartReducer from "./CartReducer";
import LocationReducer from "./LocationReducer";
import ResraurantReducer from "./RestaurantReducer";
import ImageUploadReducer from "./ImageUploadReducer";
import { USER_SIGNOUT } from "../Actions/types";

const appreducer = combineReducers({
  signin: signinReducer,
  owner: OwnerReducer,
  customer: CustomerReducer,
  cartDetails: CartReducer,
  currentLocation: LocationReducer,
  restaurants: ResraurantReducer,
  imageUpload: ImageUploadReducer,
});

const rootreducer = (state, action) => {
  if (action.type === USER_SIGNOUT) {
    return appreducer(undefined, action);
  }
  return appreducer(state, action);
};

export default rootreducer;
