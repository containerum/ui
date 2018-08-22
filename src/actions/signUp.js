/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants/signUpConstants';
import { webApi, appRecaptcha, routerLinks } from '../config';

// const isServer = typeof window === 'undefined';

const signUpRequest = (email, password, recaptcha) => ({
  type: SIGNUP_REQUESTING,
  isFetching: true,
  email,
  password,
  recaptcha
});

const signUpSuccess = data => ({
  type: SIGNUP_SUCCESS,
  isFetching: false,
  data
});

const signUpFailure = err => ({
  type: SIGNUP_FAILURE,
  isFetching: false,
  err
});

export const fetchSignUp = (
  email: string,
  password: string,
  recaptcha: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(signUpRequest(email, password, recaptcha));
  const browser = cookie.load('browser');

  const response = await axios.post(
    `${URL}/user/sign_up`,
    {
      login: email,
      password,
      recaptcha: appRecaptcha !== '{{ RECAPTCHA }}' ? recaptcha : 'offline'
    },
    {
      headers: {
        'User-Client': browser
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status } = response;
  switch (status) {
    case 201: {
      dispatch(signUpSuccess(data));
      dispatch(push(routerLinks.confirmEmailLink));
      break;
    }
    case 503: {
      if (data.message === 'Service not available') {
        dispatch(signUpSuccess(data));
        dispatch(push(routerLinks.confirmEmailLink('notAvailable')));
      } else dispatch(signUpFailure(data.message));
      break;
    }
    default: {
      dispatch(signUpFailure(data.message));
    }
  }
};

export const fetchSignUpIfNeeded = (
  email: string,
  password: string,
  recaptcha: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchSignUp(email, password, recaptcha, axios));
};
