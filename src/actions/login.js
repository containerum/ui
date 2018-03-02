/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants/loginConstants';
import { webApiLoginGroup } from '../config';

const loginRequest = (email, password) => ({
  type: LOGIN_REQUESTING,
  isFetching: true,
  email,
  password
});

const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  token
});

const loginFailure = err => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  err
});

export const fetchLogin = (
  email: string,
  password: string,
  axios: any,
  URL: string = webApiLoginGroup
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(loginRequest(email, password));

  const response = await axios.post(
    `${URL}/api/login`,
    { username: email, password },
    {
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { token } = response.data;
  const { status } = response;
  switch (status) {
    case 200: {
      cookie.save('token', token, { path: '/' });
      dispatch(loginSuccess(token));
      dispatch(push('/dashboard'));
      break;
    }
    default: {
      cookie.remove('token', { path: '/' });
      dispatch(loginFailure(response.data.message));
    }
  }
};

export const fetchLoginIfNeeded = (
  email: string,
  password: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchLogin(email, password, axios));
};
