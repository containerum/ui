/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_BALANCE_REQUESTING,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE
} from '../../constants/billingConstants/getBalance';
import { webApiLogin } from '../../config/index';

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
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getBalanceRequest());

  const response = await axios.get(`${URL}/isp/user/balance`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'User-Token': accessToken
      // 'X-User-ID': '76603eda-d9e0-4ed7-91be-2d5cf6ff76b2',
      // 'X-User-Role': 'user'
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
