import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ADMIN_DELETE_USER_INVALID,
  ADMIN_DELETE_USER_REQUESTING,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAILURE
} from '../../constants/globalMembershipConstants/adminDeleteUser';
import { webApi } from '../../config/index';

const adminDeleteUserInvalid = () => ({
  type: ADMIN_DELETE_USER_INVALID
});

const adminDeleteUserRequest = () => ({
  type: ADMIN_DELETE_USER_REQUESTING,
  isFetching: true
});

const adminDeleteUserSuccess = (data, status, method, idName) => ({
  type: ADMIN_DELETE_USER_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const adminDeleteUserFailure = (err, status, idName) => ({
  type: ADMIN_DELETE_USER_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const adminDeleteUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAdminDeleteUser = (
  idName: string,
  username: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(adminDeleteUserRequest());
  const response = await axios.post(
    `${URL}/admin/user/deactivation`,

    { login: username },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },

      validateStatus: status => status >= 200 && status <= 505
    }
  );

  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(adminDeleteUserSuccess(data, 202, config.method, username));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(adminDeleteUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(adminDeleteUserFailure(data.message, status, username));
      break;
    }
    default: {
      dispatch(adminDeleteUserFailure(data.message, status, username));
    }
  }
  dispatch(adminDeleteUserInvalid());
};

export const fetchAdminDeleteUserIfNeeded = (
  idName: string,
  username: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchAdminDeleteUser(idName, username, axios));
