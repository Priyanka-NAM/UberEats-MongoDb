import { ALL_RESTAURANTS, ALL_RESTAURANTS_FAILURE } from "../Actions/types";

const intitalState = {
  allRestaurants: {},
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case ALL_RESTAURANTS:
      return {
        ...state,
        allRestaurants: action.payload.allRestaurants,
      };
    case ALL_RESTAURANTS_FAILURE:
      return {
        ...state,
        allRestaurants: [],
      };
    default:
      return state;
  }
};
