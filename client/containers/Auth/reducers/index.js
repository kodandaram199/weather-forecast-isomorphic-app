import {
  LOGIN,
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILED,
  REGISTER,
  REQUEST_REGISTER,
  REQUEST_REGISTER_FAILED
} from '../actionTypes';

const INITIAL_STATE = {
  login_pending: false,
  login_failed: false,
  login: {},
  register_pending: false,
  register_failed: false,
  register: {}
};

const LOGIN_INITIAL_FLAG_STATE = {
  login_pending: false,
  login_failed: false,
};

const REGISTER_INITIAL_FLAG_STATE = {
  register_pending: false,
  register_failed: false
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, LOGIN_INITIAL_FLAG_STATE, {
        login_pending: true,
      });
    case LOGIN:
      return Object.assign({}, state, LOGIN_INITIAL_FLAG_STATE, {
        login: action.payload.json
      });
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, LOGIN_INITIAL_FLAG_STATE, {
        login_failed: true
      });
    case REQUEST_REGISTER:
     return Object.assign({}, state, REGISTER_INITIAL_FLAG_STATE, {
       register_pending: true,
     });
    case REGISTER:
     return Object.assign({}, state, REGISTER_INITIAL_FLAG_STATE, {
       register: action.payload.json
     });
    case REQUEST_REGISTER_FAILED:
     return Object.assign({}, state, REGISTER_INITIAL_FLAG_STATE, {
       register_failed: true
     });
    default:
      return state;
  }
}
