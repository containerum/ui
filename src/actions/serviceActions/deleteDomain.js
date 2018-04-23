/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_DOMAIN_REQUESTING,
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_FAILURE
} from '../../constants/serviceConstants/deleteDomain';
import { webApiLogin } from '../../config/index';

const deleteDomainRequest = () => ({
  type: DELETE_DOMAIN_REQUESTING,
  isFetching: true
});

const deleteDomainSuccess = (data, status, method, label) => ({
  type: DELETE_DOMAIN_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  label
});

const deleteDomainFailure = (err, status, label) => ({
  type: DELETE_DOMAIN_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const deleteDomainInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteDomain = (
  idName: string,
  label: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(deleteDomainRequest());

  const response = await axios.delete(
    `${URL}/namespace/${idName}/ingress/${label}`,
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
    case 202: {
      dispatch(deleteDomainSuccess(data, status, config.method, label));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteDomainInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deleteDomainFailure(data.message, status, label));
      break;
    }
    default: {
      dispatch(deleteDomainFailure(data.message, status, label));
    }
  }
};

export const fetchDeleteDomainIfNeeded = (
  idName: string,
  label: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteDomain(idName, label, axios));
