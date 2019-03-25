import {
  FORECAST_REQUEST,
  FORECAST_REQUEST_SUCCESS,
  FORECAST_REQUEST_FAIL
} from "../actions/types";

const initState = { data: null, error: null };
export default (forecastReducer = (state = initState, action) => {
  switch (action.type) {
    case FORECAST_REQUEST:
      return { ...state };
    case FORECAST_REQUEST_SUCCESS:
      return { data: action.data, error: null };
    case FORECAST_REQUEST_FAIL:
      return { data: null, error: action.error };
    default:
      return state;
  }
});
