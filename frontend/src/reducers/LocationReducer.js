import { LOCATION_UPDATE } from "../Actions/types";

const intitalState = {
  addressDescription: "",
  addressLine1: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
};
export default (state = intitalState, action) => {
  switch (action.type) {
    case LOCATION_UPDATE:
      return {
        ...state,
        addressDescription: action.payload.addressDescription,
        addressLine1: action.payload.addressLine1,
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country,
        zipcode: action.payload.zipcode,
      };
    default:
      return state;
  }
};
