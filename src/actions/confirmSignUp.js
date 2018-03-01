/* @flow */

// import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  CONFIRM_SIGNUP_REQUESTING,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE
} from '../constants/confirmSignUpConstants';
import { webApiLoginGroup } from '../config';

// const isServer = typeof window === 'undefined';
// const ReactGA = isServer ? require('react-ga') : null;

const confirmSignUpRequest = hashParam => ({
  type: CONFIRM_SIGNUP_REQUESTING,
  isFetching: true,
  hashParam
});

const confirmSignUpSuccess = data => ({
  type: CONFIRM_SIGNUP_SUCCESS,
  isFetching: false,
  data
});

const confirmSignUpFailure = err => ({
  type: CONFIRM_SIGNUP_FAILURE,
  isFetching: false,
  err
});

export const fetchConfirmSignUp = (
  hashParam: string,
  axios: any,
  URL: string = webApiLoginGroup
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(confirmSignUpRequest(hashParam));

  const response = await axios.get(`${URL}/api/confirm/${hashParam}`, {
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*'
      // 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { data, status } = response;
  // console.log(data, status);
  switch (status) {
    case 200: {
      // if (
      //   typeof window !== 'undefined' &&
      //   typeof window.navigator !== 'undefined'
      // ) {
      //   ReactGA.event({
      //     category: 'UI',
      //     action: 'UI_SUp_confirmed'
      //   });
      // }
      dispatch(confirmSignUpSuccess(data));
      break;
    }
    default: {
      cookie.remove('token', { path: '/' });
      dispatch(confirmSignUpFailure('Hash is not valid'));
    }
  }
};

export const fetchConfirmSignUpIfNeeded = (hashParam: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  dispatch(fetchConfirmSignUp(hashParam, axios));
};
