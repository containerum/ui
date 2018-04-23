/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILURE
} from '../../constants/serviceConstants/getDomains';
import { webApiLogin } from '../../config/index';

const getDomainsRequest = () => ({
  type: GET_DOMAINS_REQUESTING,
  isFetching: true
});

const getDomainsSuccess = data => ({
  type: GET_DOMAINS_SUCCESS,
  isFetching: false,
  data
});

const getDomainsFailure = err => ({
  type: GET_DOMAINS_FAILURE,
  isFetching: false,
  err
});

const getDomainsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetDomains = (
  idName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(getDomainsRequest());

  const response = await axios.get(`${URL}/ingresses`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  // console.log(response);
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getDomainsSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getDomainsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getDomainsFailure(data.message));
      break;
    }
    default: {
      dispatch(getDomainsFailure(data.message));
    }
  }
};

export const fetchGetDomainsIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetDomains(idName, axios));
