/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_DOMAIN_REQUESTING,
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_FAILURE
} from '../../constants/domainConstants/deleteDomain';
import { webApi, routerLinks } from '../../config/index';

const deleteDomainRequest = () => ({
  type: DELETE_DOMAIN_REQUESTING,
  isFetching: true
});

const deleteDomainSuccess = (data, status, method, ips) => ({
  type: DELETE_DOMAIN_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  ips
});

const deleteDomainFailure = (err, status, ips) => ({
  type: DELETE_DOMAIN_FAILURE,
  isFetching: false,
  err,
  status,
  ips
});

const deleteDomainInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteDomain = (
  id: string,
  ips: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(deleteDomainRequest());

  const response = await axios.delete(`${URL}/domains/${id}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteDomainSuccess(data.domains, status, config.method, ips));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteDomainInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteDomainFailure(data.message, status, ips));

      break;
    }
    default: {
      dispatch(deleteDomainFailure(data.message, status, ips));
    }
  }
};

export const fetchDeleteDomainIfNeeded = (
  id: string,
  ips: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteDomain(id, ips, axios));
