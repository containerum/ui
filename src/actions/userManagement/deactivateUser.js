import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DEACTIVATE_USER_INVALID,
  DEACTIVATE_USER_REQUESTING,
  DEACTIVATE_USER_SUCCESS,
  DEACTIVATE_USER_FAILURE
} from '../../constants/userManagement/deactivateUser';
import { webApi } from '../../config/index';

const deactivateUserInvalid = () => ({
  type: DEACTIVATE_USER_INVALID
});

const deactivateUserRequest = () => ({
  type: DEACTIVATE_USER_REQUESTING,
  isFetching: true
});

const deactivateUserSuccess = (login, status, method) => ({
  type: DEACTIVATE_USER_SUCCESS,
  isFetching: false,
  login,
  status,
  method
});

const deactivateUserFailure = (err, status, login) => ({
  type: DEACTIVATE_USER_FAILURE,
  isFetching: false,
  err,
  status,
  login
});

const deactivateUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeactivateUser = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deactivateUserRequest());

  const response = await axios.post(
    `${URL}/admin/user/deactivation`,
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
      dispatch(deactivateUserSuccess(login, status, 'put'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deactivateUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deactivateUserFailure(data.message, status));
      break;
    }
    default: {
      dispatch(deactivateUserFailure(data.message, status, login));
    }
  }
  dispatch(deactivateUserInvalid());
};

export const fetchDeactivateUserIfNeeded = (login: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeactivateUser(login, axios));
