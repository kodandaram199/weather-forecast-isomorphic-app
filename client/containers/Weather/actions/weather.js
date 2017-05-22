import fetch from 'isomorphic-fetch';

import {
    RECEIVE_FORECAST,
    REQUEST_FORECAST,
    REQUEST_FORECAST_FAILED,
    RECEIVE_WEATHER,
    REQUEST_WEATHER,
    REQUEST_WEATHER_FAILED
} from '../actionTypes/weather';
import callApi from '../../../api';
import { APP_ID, BASE_URL } from '../../../config';

export function fetchWeather(params) {
    const url = `${BASE_URL}/weather?${params}&units=metric&appid=${APP_ID}`;
    return function (dispatch) {
        dispatch(requestWeather());
        callApi(url).then(json =>{
            dispatch(receiveWeather(json));
        }).catch(error => dispatch(requestWeatherFailed(error.toString())));
    };
}

export function requestWeather() {
    return {
        type: REQUEST_WEATHER
    };
}

export function requestWeatherFailed(error) {
    return {
        type: REQUEST_WEATHER_FAILED,
        error
    };
}

export function receiveWeather(json) {
    return {
        type: RECEIVE_WEATHER,
        payload: {
            json
        }
    };
}

export function fetchForecast(params) {
    const url = `${BASE_URL}/forecast?${params}&units=metric&appid=${APP_ID}`;
    return function (dispatch) {
        dispatch(requestForecast());
        callApi(url).then(json =>{
            dispatch(receiveForecast(json));
        })
        .catch(error => {
            dispatch(requestForecastFailed(error.toString()))
        });
    };
}

export function requestForecast() {
    return {
        type: REQUEST_FORECAST
    };
}


export function requestForecastFailed(error) {
    return {
        type: REQUEST_FORECAST_FAILED,
        error
    };
}

export function receiveForecast(json) {
    return {
        type: RECEIVE_FORECAST,
        payload: {
            json
        }
    };
}