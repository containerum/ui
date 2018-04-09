/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants/signUpConstants';
import { webApiLogin } from '../config';

// const isServer = typeof window === 'undefined';
// const ReactGA = isServer ? require('react-ga') : null;

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
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(signUpRequest(email, password, recaptcha));
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  const response = await axios.post(
    `${URL}/user/sign_up`,
    {
      login: email,
      password,
      recaptcha
    },
    {
      headers: {
        'User-Client': browser
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status } = response;
  // console.log(data);
  switch (status) {
    case 201: {
      // if (
      //   typeof window !== 'undefined' &&
      //   typeof window.navigator !== 'undefined'
      // ) {
      //   ReactGA.event({
      //     category: 'UI',
      //     action: 'UI_SUp_request'
      //   });
      // }
      dispatch(signUpSuccess(data));
      dispatch(push('/confirmEmail'));
      break;
    }
    default: {
      cookie.remove('accessToken', { path: '/' });
      cookie.remove('refreshToken', { path: '/' });
      cookie.remove('lastTimeToRefresh', { path: '/' });
      dispatch(signUpFailure(response.data.message));
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
