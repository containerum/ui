/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_BALANCE_REQUESTING,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE
} from '../../constants/billingConstants/getBalance';
import { webApi } from '../../config/index';

const getBalanceRequest = () => ({
  type: GET_BALANCE_REQUESTING,
  isFetching: true
});

const getBalanceSuccess = data => ({
  type: GET_BALANCE_SUCCESS,
  isFetching: false,
  data
});

const getBalanceFailure = err => ({
  type: GET_BALANCE_FAILURE,
  isFetching: false,
  err
});

export const fetchGetBalance = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getBalanceRequest());

  const response = await axios.get(`${URL}/api/profile/balance`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getBalanceSuccess(data));
      break;
    }
    case 401: {
      dispatch(getBalanceRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getBalanceFailure(data.message));
    }
  }
};

export const fetchGetBalanceIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetBalance(idName, axios));
