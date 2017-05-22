import {
  RECEIVE_FORECAST,
  REQUEST_FORECAST,
  REQUEST_FORECAST_FAILED,
  RECEIVE_WEATHER,
  REQUEST_WEATHER,
  REQUEST_WEATHER_FAILED
} from '../actionTypes/weather';

const INITIAL_STATE = {
  weather_pending: false,
  weather_failed: false,
  current: {},
  forecast_pending: false,
  forecast_failed: false,
  forecast: {}
};

const WEATHER_INITIAL_FLAG_STATE = {
  weather_pending: false,
  weather_failed: false,
};

const FORECAST_INITIAL_FLAG_STATE = {
  forecast_pending: false,
  forecast_failed: false,
};

export default function weather(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

    case REQUEST_WEATHER_FAILED:
      return Object.assign({}, state, WEATHER_INITIAL_FLAG_STATE, {
        weather_failed: true
      });

    case REQUEST_WEATHER:
      return Object.assign({}, state, WEATHER_INITIAL_FLAG_STATE, {
        weather_pending: true,
      });

    case RECEIVE_WEATHER:
      return Object.assign({}, state, WEATHER_INITIAL_FLAG_STATE, {
        current: action.payload.json,
      });

    case REQUEST_FORECAST_FAILED:
      return Object.assign({}, state, FORECAST_INITIAL_FLAG_STATE, {
        forecast_failed: true
      });

    case REQUEST_FORECAST:
      return Object.assign({}, state, FORECAST_INITIAL_FLAG_STATE, {
        forecast_pending: true,
      });

    case RECEIVE_FORECAST:
      return Object.assign({}, state, FORECAST_INITIAL_FLAG_STATE, {
        forecast: action.payload.json,
      });

    default:
      return state;
  }
}
