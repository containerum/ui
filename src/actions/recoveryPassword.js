/* @flow */

// import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  RECOVERY_PASSWORD_REQUESTING,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILURE
} from '../constants/recoveryPasswordConstants';
import { webApiLogin } from '../config';

const recoveryPasswordRequest = (hashParam, password) => ({
  type: RECOVERY_PASSWORD_REQUESTING,
  isFetching: true,
  hashParam,
  password
});

const recoveryPasswordSuccess = data => ({
  type: RECOVERY_PASSWORD_SUCCESS,
  isFetching: false,
  data
});

const recoveryPasswordFailure = err => ({
  type: RECOVERY_PASSWORD_FAILURE,
  isFetching: false,
  err
});

export const fetchRecoveryPassword = (
  hashParam: string,
  password: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(recoveryPasswordRequest(hashParam, password));
  const browser = cookie.load('browser');

  const response = await axios.post(
    `${URL}/password/restore`,
    {
      link: hashParam,
      new_password: password
    },
    {
      headers: {
        'User-Client': browser
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  const { access_token: accessToken, refresh_token: refreshToken } = data;
  switch (status) {
    case 202: {
      cookie.save('accessToken', accessToken, { path: '/' });
      cookie.save('refreshToken', refreshToken, { path: '/' });
      dispatch(recoveryPasswordSuccess(data));
      if (typeof window !== 'undefined') {
        window.location.replace('/dashboard');
      }
      break;
    }
    default: {
      dispatch(recoveryPasswordFailure(response.data.message));
    }
  }
};

export const fetchRecoveryPasswordIfNeeded = (
  hashParam: string,
  password: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchRecoveryPassword(hashParam, password, axios));
};
