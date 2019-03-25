import { takeLatest, call, put } from "redux-saga/effects";
import { getForecastSuccess, getForecastFail } from "../actions";
import {
  FORECAST_REQUEST,
  FORECAST_REQUEST_SUCCESS,
  FORECAST_REQUEST_FAIL
} from "../actions/types";
import { OPEN_WEATHER_API_KEY } from "../api_key";
import axios from "axios";
import { AsyncStorage } from "react-native";

const fetchForecast = cityName => {
  return axios({
    method: "get",
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  });
};

const getLocation = async () => {
  try {
    const cityName = await AsyncStorage.getItem("location")
    return cityName
  }
  catch(error){
    console.log("Can't get location", error)
  }
}

function* forecastSaga() {
  try {
    // console.log("action", action)
    const cityName = yield call(getLocation)
    const forecast = yield call(fetchForecast, cityName);
    yield put({
      type: FORECAST_REQUEST_SUCCESS,
      data: forecast.data
    });
  } catch (error) {
    yield put({ type: FORECAST_REQUEST_FAIL, error: error });
  }
}

export function* watcherForecastSaga() {
  yield takeLatest(FORECAST_REQUEST, forecastSaga);
}
