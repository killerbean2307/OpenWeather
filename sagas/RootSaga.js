import { call, all, fork } from "redux-saga/effects";
import { watcherCurrentWeatherSaga } from "./CurrentWeatherSaga";
import { watcherForecastSaga } from "./ForecastSaga";

export default function* rootSaga() {
  yield all([fork(watcherCurrentWeatherSaga), fork(watcherForecastSaga)]);
}
