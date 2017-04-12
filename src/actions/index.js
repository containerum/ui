import axios from 'axios'
import { browserHistory } from 'react-router'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}

function requestSignUp(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    creds
  }
}

function receiveSignUp() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false
  }
}

function SignUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    message
  }
}

export function SignUpUser(creds) {

  return dispatch => {
    dispatch(requestSignUp(creds))
    return axios.post('http://139.59.146.89/api/users', {username: creds.username, password: creds.password})
      .then(response => {
        if (!response.ok) {
          dispatch(receiveSignUp())
          browserHistory.push('/Login')
        } else {
          dispatch(SignUpError(response.status))
        }
      }).catch(err => console.log(err))
}
}
function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


export function LOGINUser(creds) {

  return dispatch => {
    dispatch(requestLOGIN(creds))
    return axios.post('http://139.59.146.89/api/login', {username: creds.username, password: creds.password})
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveLOGIN(response))
          localStorage.setItem('id_token', response.data.token)
          browserHistory.push('/')
        } else {
          dispatch(LOGINError(response.status))
        }
      }).catch(err => console.log(err))
   }
}


function requestLOGIN(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLOGIN(response) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: response.data.token
  }
}

function LOGINError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}
