import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ACTIVATE_USER_INVALID,
  ACTIVATE_USER_REQUESTING,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE
} from '../../constants/userManagement/activateUser';
import { webApi } from '../../config/index';

const activateUserInvalid = () => ({
  type: ACTIVATE_USER_INVALID
});

const activateUserRequest = () => ({
  type: ACTIVATE_USER_REQUESTING,
  isFetching: true
});

const activateUserSuccess = (login, status, method) => ({
  type: ACTIVATE_USER_SUCCESS,
  isFetching: false,
  login,
  status,
  method
});

const activateUserFailure = (err, status, login) => ({
  type: ACTIVATE_USER_FAILURE,
  isFetching: false,
  err,
  status,
  login
});

const activateUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchActivateUser = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(activateUserRequest());

  const response = await axios.post(
    `${URL}/admin/user/activation`,
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
      dispatch(activateUserSuccess(login, status, 'put'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(activateUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(activateUserFailure(data.message, status));
      break;
    }
    default: {
      dispatch(activateUserFailure(data.message, status, login));
    }
  }
  dispatch(activateUserInvalid());
};

export const fetchActivateUserIfNeeded = (login: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchActivateUser(login, axios));
