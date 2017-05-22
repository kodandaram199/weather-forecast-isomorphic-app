import fetch from 'isomorphic-fetch';
import {
    RECEIVE_LOCATION,
    REQUEST_LOCATION,
    REQUEST_LOCATION_FAILED,
    RECEIVE_FREQUENT_LOCATIONS,
    REQUEST_FREQUENT_LOCATIONS,
    REQUEST_FREQUENT_LOCATIONS_FAILED } from '../actionTypes/location';
import callApi from '../../../api';
import { SERVER_API } from '../../../config';

export const fetchLocation = () => {
    return function (dispatch) {
        if (typeof window === 'undefined') {
            global.window = {}
        }

        if (window.navigator.geolocation) {
            dispatch(requestLocation());
            window.navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log('navigator.geolocation not supported.');
        }

        function success(position) {
            const {latitude, longitude} = position.coords;
            dispatch(receiveLocation({latitude, longitude}));
        }

        function error(error) {
            console.error(error);
            dispatch(requestLocationFailed(error.toString()));
        }
    }
};

export function requestLocation() {
    return {
        type: REQUEST_LOCATION
    };
}

export function receiveLocation(location) {
    return {
        type: RECEIVE_LOCATION,
        payload: {
            location
        }
    };
}

export function requestLocationFailed(error) {
    return {
        type: REQUEST_LOCATION_FAILED,
        payload: {
            location
        }
    };
}

export function fetchFrequentLocations(token) {
    const url = `${SERVER_API}/locations`;
    const method = 'GET';
    const headers = {
        'x-access-token': token,
        'Content-Type': 'application/json',
    };
    return function (dispatch) {
        dispatch(requestFrequentLocations());
        callApi(url, method, headers).then(json =>{
            dispatch(receiveFrequentLocations(json));
        })
        .catch(error => {
            console.log('error happened: ', error);
            dispatch(requestFrequentLocationsFailed(error.toString()))
        });
    };
}

export function requestFrequentLocations() {
    return {
        type: REQUEST_FREQUENT_LOCATIONS
    };
}

export function receiveFrequentLocations(json) {
    return {
        type: RECEIVE_FREQUENT_LOCATIONS,
        payload: {
            json
        }
    };
}

export function requestFrequentLocationsFailed(error) {
    return {
        type: REQUEST_FREQUENT_LOCATIONS_FAILED
    };
}

export function saveLocation(location, token) {
    const url = `${SERVER_API}/locations`;
    const method = 'POST';
    const headers = {
        'x-access-token': token,
        'Content-Type': 'application/json',
    };
    const body = {location};
    return function (dispatch) {
    callApi(url, method, headers, body).then(json =>{
        dispatch(fetchFrequentLocations(token));
    })
    .catch(error => {
        console.log('error happened: ', error);
    });
    };
}