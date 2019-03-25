import { takeLatest, call, put, select } from "redux-saga/effects";
import { getCurrentWeatherSuccess, getCurrentWeatherFail } from "../actions";
import {
  CURRENT_WEATHER_REQUEST,
  CURRENT_WEATHER_REQUEST_SUCCESS,
  CURRENT_WEATHER_REQUEST_FAIL
} from "../actions/types";
import { OPEN_WEATHER_API_KEY } from "../api_key";
import axios from "axios";
import { AsyncStorage } from "react-native";

const fetchCurrentWeather = cityName => {
  return axios({
    method: "get",
    url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  });
};

function* currentWeatherSaga() {
  try {
    // console.log("action", action)
    const cityName = yield AsyncStorage.getItem("location");
    const currentWeather = yield call(fetchCurrentWeather, cityName);
    yield put({
      type: CURRENT_WEATHER_REQUEST_SUCCESS,
      data: currentWeather.data
    });
  } catch (error) {
    yield put({ type: CURRENT_WEATHER_REQUEST_FAIL, error: error });
  }
}

export function* watcherCurrentWeatherSaga() {
  yield takeLatest(CURRENT_WEATHER_REQUEST, currentWeatherSaga);
}
