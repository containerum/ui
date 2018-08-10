/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_SECRET_REQUESTING,
  GET_SECRET_SUCCESS,
  GET_SECRET_FAILURE
} from '../../constants/secretConstants/getSecret';
import { webApi, routerLinks } from '../../config';

const getSecretRequest = () => ({
  type: GET_SECRET_REQUESTING,
  isFetching: true
});

const getSecretSuccess = (data, status, idName, idSecret) => ({
  type: GET_SECRET_SUCCESS,
  isFetching: false,
  data,
  status,
  idName,
  idSecret
});

const getSecretFailure = (err, status, idName, idSecret) => ({
  type: GET_SECRET_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  idSecret
});

const getSecretInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetSecret = (
  idName: string,
  idSecret: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getSecretRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/secrets/${idSecret}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getSecretSuccess(data, status, idName, idSecret));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getSecretInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getSecretFailure(data.message, status, idName, idSecret));
      break;
    }
    default: {
      dispatch(getSecretFailure(data.message, status, idName, idSecret));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetSecretIfNeeded = (
  idName: string,
  idSecret: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetSecret(idName, idSecret, axios));
