/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  FORGOT_REQUESTING,
  FORGOT_SUCCESS,
  FORGOT_FAILURE
} from '../constants/forgotConstants';
import { webApi } from '../config';

const forgotRequest = email => ({
  type: FORGOT_REQUESTING,
  isFetching: true,
  email
});

const forgotSuccess = data => ({
  type: FORGOT_SUCCESS,
  isFetching: false,
  data
});

const forgotFailure = err => ({
  type: FORGOT_FAILURE,
  isFetching: false,
  err
});

export const fetchForgot = (
  email: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(forgotRequest(email));
  const browser = cookie.load('browser');

  const response = await axios.post(
    `${URL}/password/reset`,
    { login: email },
    {
      headers: {
        'User-Client': browser
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(forgotSuccess(data));
      dispatch(push('/checkEmail'));
      break;
    }
    default: {
      dispatch(forgotFailure(response.data.message));
    }
  }
};

export const fetchForgotIfNeeded = (email: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  dispatch(fetchForgot(email, axios));
};
