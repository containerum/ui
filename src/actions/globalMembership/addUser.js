import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ADD_GLOBAL_USER_INVALID,
  ADD_GLOBAL_USER_REQUESTING,
  ADD_GLOBAL_USER_SUCCESS,
  ADD_GLOBAL_USER_FAILURE
} from '../../constants/globalMembershipConstants/addGlobalUser';
import { webApi } from '../../config/index';

const addGlobalUserInvalid = () => ({
  type: ADD_GLOBAL_USER_INVALID
});

const addGlobalUserRequest = () => ({
  type: ADD_GLOBAL_USER_REQUESTING,
  isFetching: true
});

const addGlobalUserSuccess = (data, status, method) => ({
  type: ADD_GLOBAL_USER_SUCCESS,
  isFetching: false,
  data,
  status,
  method
});

const addGlobalUserFailure = (err, status, login) => ({
  type: ADD_GLOBAL_USER_FAILURE,
  isFetching: false,
  err,
  status,
  login
});

const addGlobalUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAddGlobalUser = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(addGlobalUserRequest());

  const response = await axios.post(`${URL}/admin/user/sign_up`, login, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 201: {
      dispatch(addGlobalUserSuccess(data, status, 'put'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addGlobalUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(addGlobalUserFailure(data.message, status));
      break;
    }
    default: {
      dispatch(addGlobalUserFailure(data.message, status));
    }
  }
  dispatch(addGlobalUserInvalid());
};

export const fetchAddGlobalUserIfNeeded = (login: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchAddGlobalUser(login, axios));
