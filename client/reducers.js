/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import location from './containers/Weather/reducers/location';
import weather from './containers/Weather/reducers/weather';
import auth from './containers/Auth/reducers';

export default combineReducers({
  location,
  weather,
  auth
});
