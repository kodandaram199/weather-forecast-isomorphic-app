import {
	RECEIVE_LOCATION,
	REQUEST_LOCATION,
	REQUEST_LOCATION_FAILED,
	RECEIVE_FAVORITE_LOCATIONS,
	REQUEST_FAVORITE_LOCATIONS,
	REQUEST_FAVORITE_LOCATIONS_FAILED,
	RECEIVE_FREQUENT_LOCATIONS,
	REQUEST_FREQUENT_LOCATIONS,
	REQUEST_FREQUENT_LOCATIONS_FAILED } from '../actionTypes/location';

const INITIAL_STATE = {
	location_pending: false,
	location_failed: false,
	location: {},
	frequent_locations_pending: false,
	frequent_locations_failed: false,
	frequent_locations: {},
	favorite_locations_pending: false,
	favorite_locations_failed: false,
	favorite_locations: {},
};

const LOCATION_INITIAL_FLAG_STATE = {
	location_pending: false,
	location_failed: false,
};

const FREQUENT_LOCATIONS_INITIAL_FLAG_STATE = {
	frequent_locations_pending: false,
	frequent_locations_failed: false,
};

const FAVORITE_LOCATIONS_INITIAL_FLAG_STATE = {
	favorite_locations_pending: false,
	favorite_locations_failed: false,
};

export default function location(state = INITIAL_STATE, action) {
	switch (action.type) {
		case REQUEST_LOCATION:
			return Object.assign({}, state, LOCATION_INITIAL_FLAG_STATE, {
				location_pending: true,
			});
		case RECEIVE_LOCATION:
			return Object.assign({}, state, LOCATION_INITIAL_FLAG_STATE, {
				location: action.payload.location
			});
		case REQUEST_LOCATION_FAILED:
			return Object.assign({}, state, LOCATION_INITIAL_FLAG_STATE, {
				location_failed: true
			});
		case REQUEST_FREQUENT_LOCATIONS:
			return Object.assign({}, state, FREQUENT_LOCATIONS_INITIAL_FLAG_STATE, {
				frequent_locations_pending: true,
			});
		case RECEIVE_FREQUENT_LOCATIONS:
			return Object.assign({}, state, FREQUENT_LOCATIONS_INITIAL_FLAG_STATE, {
				frequent_locations: action.payload.json
			});
		case REQUEST_FREQUENT_LOCATIONS_FAILED:
			return Object.assign({}, state, FREQUENT_LOCATIONS_INITIAL_FLAG_STATE, {
				frequent_locations_failed: true
			});

		/*case REQUEST_FAVORITE_LOCATIONS:
			return Object.assign({}, state, FAVORITE_LOCATIONS_INITIAL_FLAG_STATE, {
				favorite_locations_pending: true,
			});
		case RECEIVE_FAVORITE_LOCATIONS:
			return Object.assign({}, state, FAVORITE_LOCATIONS_INITIAL_FLAG_STATE, {
				favorite_locations: action.payload.json
			});
		case REQUEST_FAVORITE_LOCATIONS_FAILED:
			return Object.assign({}, state, FAVORITE_LOCATIONS_INITIAL_FLAG_STATE, {
				favorite_locations_failed: true
			});*/
		default:
			return state;
	}
}
