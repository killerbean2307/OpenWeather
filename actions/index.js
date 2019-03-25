import {
  SET_LOCATION,
  CURRENT_WEATHER_REQUEST,
  CURRENT_WEATHER_REQUEST_SUCCESS,
  CURRENT_WEATHER_REQUEST_FAIL,
  FORECAST_REQUEST,
  FORECAST_REQUEST_SUCCESS,
  FORECAST_REQUEST_FAIL
} from "./types";

export const setLocation = location => {
  return {
    type: SET_LOCATION,
    location: location
  };
};

export const getCurrentWeather = () => {
  return {
    type: CURRENT_WEATHER_REQUEST
  };
};

export const getCurrentWeatherSuccess = data => {
  return {
    type: CURRENT_WEATHER_REQUEST_SUCCESS,
    data
  };
};

export const getCurrentWeatherFail = error => {
  return {
    type: CURRENT_WEATHER_REQUEST_FAIL,
    error
  };
};

export const getForecast = () => {
  return {
    type: FORECAST_REQUEST
  };
};

export const getForecastSuccess = data => {
  return {
    type: FORECAST_REQUEST_SUCCESS,
    data
  };
};

export const getForecastFail = error => {
  return {
    type: FORECAST_REQUEST_FAIL,
    error
  };
};
