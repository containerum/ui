/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_ACCOUNT_REQUESTING,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE
} from '../../constants/profileConstants/deleteAccount';
import { webApi, routerLinks } from '../../config';

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

const deleteAccountInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteAccount = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteAccountRequest());

  const response = await axios.post(
    `${URL}/user/delete/partial`,
    {},
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
        // 'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(deleteAccountSuccess(data, status));
      if (typeof window !== 'undefined') {
        window.location.replace('https://containerum.com/');
      }
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteAccountInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteAccountFailure(data.message, status));
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
