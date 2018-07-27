import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  SET_USER_AS_ADMIN_INVALID,
  SET_USER_AS_ADMIN_REQUESTING,
  SET_USER_AS_ADMIN_SUCCESS,
  SET_USER_AS_ADMIN_FAILURE
} from '../../constants/userManagement/setUserAsAdmin';
import { webApi } from '../../config/index';

const setUserAsAdminInvalid = () => ({
  type: SET_USER_AS_ADMIN_INVALID
});

const setUserAsAdminRequest = () => ({
  type: SET_USER_AS_ADMIN_REQUESTING,
  isFetching: true
});

const setUserAsAdminSuccess = (login, status, method) => ({
  type: SET_USER_AS_ADMIN_SUCCESS,
  isFetching: false,
  login,
  status,
  method
});

const setUserAsAdminFailure = (err, status, login) => ({
  type: SET_USER_AS_ADMIN_FAILURE,
  isFetching: false,
  err,
  status,
  login
});

const setUserAsAdminInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchSetUserAsAdmin = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(setUserAsAdminRequest());

  const response = await axios.post(
    `${URL}/admin/user`,
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
      dispatch(setUserAsAdminSuccess(login, status, 'put'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(setUserAsAdminInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(setUserAsAdminFailure(data.message, status));
      break;
    }
    default: {
      dispatch(setUserAsAdminFailure(data.message, status, login));
    }
  }
  dispatch(setUserAsAdminInvalid());
};

export const fetchSetUserAsAdminIfNeeded = (login: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchSetUserAsAdmin(login, axios));
