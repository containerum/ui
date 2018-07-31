import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  RESET_PASSWORD_OF_USER_INVALID,
  RESET_PASSWORD_OF_USER_REQUESTING,
  RESET_PASSWORD_OF_USER_SUCCESS,
  RESET_PASSWORD_OF_USER_FAILURE
} from '../../constants/userManagement/resetPasswordOfUser';
import { webApi } from '../../config/index';

const resetPasswordOfUserInvalid = () => ({
  type: RESET_PASSWORD_OF_USER_INVALID
});

const resetPasswordOfUserRequest = () => ({
  type: RESET_PASSWORD_OF_USER_REQUESTING,
  isFetching: true
});

const resetPasswordOfUserSuccess = (data, status, method, login) => ({
  type: RESET_PASSWORD_OF_USER_SUCCESS,
  isFetching: false,
  data,
  login,
  status,
  method
});

const resetPasswordOfUserFailure = (err, status, login) => ({
  type: RESET_PASSWORD_OF_USER_FAILURE,
  isFetching: false,
  err,
  status,
  login
});

const resetPasswordOfUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchResetPasswordOfUser = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(resetPasswordOfUserRequest());

  const response = await axios.post(
    `${URL}/admin/user/password/reset`,
    { login },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(resetPasswordOfUserSuccess(data, status, 'put', login));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(resetPasswordOfUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(resetPasswordOfUserFailure(data.message, status));
      break;
    }
    default: {
      dispatch(resetPasswordOfUserFailure(data.message, status, login));
    }
  }
  dispatch(resetPasswordOfUserInvalid());
};

export const fetchResetPasswordOfUserIfNeeded = (
  login: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchResetPasswordOfUser(login, axios));
