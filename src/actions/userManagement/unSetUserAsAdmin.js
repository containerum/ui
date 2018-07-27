import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  UNSET_USER_AS_ADMIN_INVALID,
  UNSET_USER_AS_ADMIN_REQUESTING,
  UNSET_USER_AS_ADMIN_SUCCESS,
  UNSET_USER_AS_ADMIN_FAILURE
} from '../../constants/userManagement/unSetUserAsAdmin';
import { webApi } from '../../config/index';

const unSetUserAsAdminInvalid = () => ({
  type: UNSET_USER_AS_ADMIN_INVALID
});

const unSetUserAsAdminRequest = () => ({
  type: UNSET_USER_AS_ADMIN_REQUESTING,
  isFetching: true
});

const unSetUserAsAdminSuccess = (login, status, method) => ({
  type: UNSET_USER_AS_ADMIN_SUCCESS,
  isFetching: false,
  login,
  status,
  method
});

const unSetUserAsAdminFailure = (err, status, login) => ({
  type: UNSET_USER_AS_ADMIN_FAILURE,
  isFetching: false,
  err,
  status,
  login
});

const unSetUserAsAdminInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchUnSetUserAsAdmin = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(unSetUserAsAdminRequest());

  const response = await axios.delete(`${URL}/admin/user`, {
    data: { login },
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(unSetUserAsAdminSuccess(login, status, 'put'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(unSetUserAsAdminInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(unSetUserAsAdminFailure(data.message, status));
      break;
    }
    default: {
      dispatch(unSetUserAsAdminFailure(data.message, status, login));
    }
  }
  dispatch(unSetUserAsAdminInvalid());
};

export const fetchUnSetUserAsAdminIfNeeded = (login: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchUnSetUserAsAdmin(login, axios));
