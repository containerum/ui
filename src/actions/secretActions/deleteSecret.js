/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_SECRET_REQUESTING,
  DELETE_SECRET_SUCCESS,
  DELETE_SECRET_FAILURE
} from '../../constants/secretConstants/deleteSecret';
import { routerLinks, webApi } from '../../config';

const deleteSecretRequest = () => ({
  type: DELETE_SECRET_REQUESTING,
  isFetching: true
});

const deleteSecretSuccess = (data, status, method, idSecret) => ({
  type: DELETE_SECRET_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idSecret
});

const deleteSecretFailure = (err, status, idSecret) => ({
  type: DELETE_SECRET_FAILURE,
  isFetching: false,
  err,
  status,
  idSecret
});

const deleteSecretInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteSecret = (
  idName: string,
  idSecret: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteSecretRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/secrets/${idSecret}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteSecretSuccess(data, 202, config.method, idSecret));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteSecretInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteSecretFailure(data.message, status, idSecret));
      break;
    }
    default: {
      dispatch(deleteSecretFailure(data.message, status, idSecret));
    }
  }
};

export const fetchDeleteSecretIfNeeded = (
  idName: string,
  idSecret: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteSecret(idName, idSecret, axios));
