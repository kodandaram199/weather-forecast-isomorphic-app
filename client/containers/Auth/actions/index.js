import fetch from 'isomorphic-fetch';
import {
  LOGIN,
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILED,
  REGISTER,
  REQUEST_REGISTER,
  REQUEST_REGISTER_FAILED
} from '../actionTypes';
import callApi from '../../../api';
import { SERVER_API } from '../../../config';

export function loginUser(username, password) {
  const url = `${SERVER_API}/users/login`;
  const method = 'POST';
  const headers = {
      'Content-Type': 'application/json',
  };
  const body = {
      username,
      password
  };

  return function (dispatch) {
    dispatch(requestLogin());
      callApi(url, method, headers, body).then(json =>{
          dispatch(login(json));
      })
      .catch(error => dispatch(requestLoginFailed(error.toString())));
  };
}

export function requestLogin() {
    return {
        type: REQUEST_LOGIN
    };
}

export function requestLoginFailed(error) {
    return {
        type: REQUEST_LOGIN_FAILED
    };
}

export function login(json) {
    return {
        type: LOGIN,
        payload: {
            json
        }
    };
}

export function registerUser(username, password) {
  const url = `${SERVER_API}/users/register`;
  const method = 'POST';
  const headers = {
      'Content-Type': 'application/json',
  };
  const body = {
      username,
      password
  };

  return function (dispatch) {
    dispatch(requestRegister());
    callApi(url, method, headers, body).then(json =>{
        dispatch(registerUser(json));
    })
    .catch(error => {
      console.log('error happened: ', error);
      dispatch(requestRegisterFailed(error.toString()))
    });
  };
}

export function requestRegister() {
    return {
        type: REQUEST_REGISTER
    };
}


export function requestRegisterFailed(error) {
    return {
        type: REQUEST_REGISTER_FAILED
    };
}

export function register(json) {
    return {
        type: REGISTER,
        payload: {
            json
        }
    };
}