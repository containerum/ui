/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  PAY_FOR_REQUESTING,
  PAY_FOR_SUCCESS,
  PAY_FOR_FAILURE
} from '../../constants/billingConstants/payFor';
import { webApi, routerLinks } from '../../config';

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

const payForInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchPayFor = (
  amount: number,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');

  dispatch(payForRequest());

  const response = await axios.post(
    `${URL}/api/pay_for`,
    { amount },
    {
      headers: {
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
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(payForInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(payForFailure(data.message));
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
