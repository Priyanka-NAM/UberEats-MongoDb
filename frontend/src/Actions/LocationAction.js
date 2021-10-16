/* eslint-disable import/prefer-default-export */
import { LOCATION_UPDATE } from "./types";

export const changeLocation = (updatedLocation) => (dispatch) =>
  dispatch({ type: LOCATION_UPDATE, payload: updatedLocation });
