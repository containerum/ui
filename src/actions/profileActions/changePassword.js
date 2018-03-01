/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CHANGE_PASSWORD_REQUESTING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from '../../constants/profileConstants/changePassword';
import { webApi } from '../../config/index';

const changePasswordRequest = () => ({
  type: CHANGE_PASSWORD_REQUESTING,
  isFetching: true
});

const changePasswordSuccess = (data, status, method) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  isFetching: false,
  data,
  status,
  method
});

const changePasswordFailure = (err, status) => ({
  type: CHANGE_PASSWORD_FAILURE,
  isFetching: false,
  err,
  status
});

export const fetchChangePassword = (
  currentPassword: string,
  newPassword: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(changePasswordRequest());

  const response = await axios.post(
    `${URL}/api/password_change`,
    { password: currentPassword, new_password: newPassword },
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Access-Control-Allow-Origin': '*'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(changePasswordSuccess(data, status, config.method));
      cookie.save('token', data.token, { path: '/' });
      break;
    }
    case 401: {
      dispatch(changePasswordFailure(data.message, status));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(changePasswordFailure(data.message, status));
    }
  }
};

export const fetchChangePasswordIfNeeded = (
  currentPassword: string,
  newPassword: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchChangePassword(currentPassword, newPassword, axios));
