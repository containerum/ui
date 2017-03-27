import axios from 'axios';
import cookie from 'react-cookie';
import { AUTH_USER,
         UNAUTH_USER } from './types';
import { browserHistory } from 'react-router';

export function loginUser({email, password}) {
  return function(dispatch) {
    axios.post('http://139.59.146.89/api/login', { email, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = '/';
      browserHistory.push('/');
    })
     .catch(error=>{
	console.log(error)
  });
    }
  }

export function registerUser({email, password}) {
  return function(dispatch) {
    axios.post('http://139.59.146.89/api/users', { email, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = '/';
    })
   .catch(error=>{
	console.log(error)
  });
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = '/Login';
  }
}
