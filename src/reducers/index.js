import { combineReducers } from 'redux';
import dataDeployment from './dDep';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions'

function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        user: action.creds
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: ''
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
      case LOGIN_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
          user: action.creds
        })
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: ''
        })
      case LOGIN_FAILURE:
        console.log(action.message)
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          errorMessage: action.message
        })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  dataDeployment,
  auth
});

export default rootReducer;
