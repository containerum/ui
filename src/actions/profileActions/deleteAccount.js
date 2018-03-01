/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_ACCOUNT_REQUESTING,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE
} from '../../constants/profileConstants/deleteAccount';
import { webApi } from '../../config/index';

const deleteAccountRequest = () => ({
  type: DELETE_ACCOUNT_REQUESTING,
  isFetching: true
});

const deleteAccountSuccess = (data, status) => ({
  type: DELETE_ACCOUNT_SUCCESS,
  isFetching: false,
  data,
  status
});

const deleteAccountFailure = (err, status) => ({
  type: DELETE_ACCOUNT_FAILURE,
  isFetching: false,
  err,
  status
});

export const fetchDeleteAccount = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(deleteAccountRequest());

  const response = await axios.delete(`${URL}/api/profile`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'Access-Control-Allow-Origin': '*'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(deleteAccountSuccess(data, status));
      cookie.remove('token', { path: '/' });
      if (typeof window !== 'undefined') {
        window.location.replace('https://containerum.com/');
      }
      break;
    }
    case 401: {
      dispatch(deleteAccountFailure(data.message, status));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(deleteAccountFailure(data.message, status));
    }
  }
};

export const fetchDeleteAccountIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeleteAccount(axios));
