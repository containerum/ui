/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_STATUS_REQUESTING,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE
} from '../../constants/statusConstants/getStatus';
import { webApi, routerLinks } from '../../config';

const getStatusRequest = () => ({
  type: GET_STATUS_REQUESTING,
  isFetching: true
});

const getStatusSuccess = data => ({
  type: GET_STATUS_SUCCESS,
  isFetching: false,
  data
});

const getStatusFailure = err => ({
  type: GET_STATUS_FAILURE,
  isFetching: false,
  err
});

const getStatusInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetStatus = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getStatusRequest());

  const response = await axios.get(`${URL}/status`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });

  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getStatusSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getStatusInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getStatusFailure(data.message));
      break;
    }
    default: {
      dispatch(getStatusFailure(data.message));
    }
  }
};

export const fetchGetStatusIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetStatus(axios));
