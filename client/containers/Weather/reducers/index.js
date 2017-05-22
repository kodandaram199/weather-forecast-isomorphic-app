import { combineReducers } from 'redux';
import weather from './weather';
import location from './location';
import auth from '../../Auth/reducers'

const rootReducer = combineReducers({
	weather,
	location,
  auth
});

export default rootReducer;
