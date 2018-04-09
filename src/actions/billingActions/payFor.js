/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  PAY_FOR_REQUESTING,
  PAY_FOR_SUCCESS,
  PAY_FOR_FAILURE
} from '../../constants/billingConstants/payFor';
import { webApiLogin } from '../../config/index';

const payForRequest = () => ({
  type: PAY_FOR_REQUESTING,
  isFetching: true
});

const payForSuccess = (data, status) => ({
  type: PAY_FOR_SUCCESS,
  isFetching: false,
  data,
  status
});

const payForFailure = (err, status) => ({
  type: PAY_FOR_FAILURE,
  isFetching: false,
  err,
  status
});

export const fetchPayFor = (
  amount: number,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(payForRequest());

  const response = await axios.post(
    `${URL}/api/pay_for`,
    { amount },
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(payForSuccess(data, status));
      if (typeof window !== 'undefined') {
        window.location.replace(data);
      }
      break;
    }
    case 401: {
      dispatch(payForFailure(data.message, status));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(payForFailure(data.message, status));
    }
  }
};

export const fetchPayForIfNeeded = (amount: number): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchPayFor(amount, axios));
