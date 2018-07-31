/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  ADD_DOMAIN_REQUESTING,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_FAILURE
} from '../../constants/domainConstants/addDomain';
import { webApi, routerLinks } from '../../config';

const addDomainRequest = () => ({
  type: ADD_DOMAIN_REQUESTING,
  isFetching: true
});

const addDomainSuccess = (data, status, method, ips) => ({
  type: ADD_DOMAIN_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  ips
});

const addDomainFailure = (err, status, ips) => ({
  type: ADD_DOMAIN_FAILURE,
  isFetching: false,
  err,
  status,
  ips
});

const addDomainInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAddDomain = (
  ips: Array,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(addDomainRequest());

  const response = await axios.post(
    `${URL}/domains`,
    {
      ip: ips
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 201: {
      dispatch(addDomainSuccess(data, 201, config.method, ips));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addDomainInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(addDomainFailure(data.message, status, ips));
      break;
    }
    default: {
      dispatch(addDomainFailure(data.message, status, ips));
    }
  }
};

export const fetchAddDomainIfNeeded = (ips: Array): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchAddDomain(ips, axios));
