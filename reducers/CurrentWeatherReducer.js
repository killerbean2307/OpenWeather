import {
  CURRENT_WEATHER_REQUEST,
  CURRENT_WEATHER_REQUEST_SUCCESS,
  CURRENT_WEATHER_REQUEST_FAIL
} from "../actions/types";

const initState = { data: null, error: null};
export default (currentWeatherReducer = (state = initState, action) => {
  switch (action.type) {
    case CURRENT_WEATHER_REQUEST:
      return { ...state};
    case CURRENT_WEATHER_REQUEST_SUCCESS:
      return { error: null, data: action.data};
    case CURRENT_WEATHER_REQUEST_FAIL:
      return { data: null, error: action.error};
    default:
      return state;
  }
});
