import { combineReducers } from "redux";
import currentWeatherReducer from "./CurrentWeatherReducer";
import locationReducer from "./LocationReducer";
import forecastReducer from "./ForecastReducer";

export default (rootReducer = combineReducers({
  location: locationReducer,
  currentWeather: currentWeatherReducer,
  forecast: forecastReducer
}));
