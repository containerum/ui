/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_SECRETS_REQUESTING,
  GET_SECRETS_SUCCESS,
  GET_SECRETS_FAILURE
} from '../../constants/secretsConstants/getSecrets';
// import isTokenExist from '../functions/isTokenExist';
import { webApi, routerLinks } from '../../config';

const getSecretsRequest = () => ({
  type: GET_SECRETS_REQUESTING,
  isFetching: true
});

const getSecretsSuccess = (data, status) => ({
  type: GET_SECRETS_SUCCESS,
  isFetching: false,
  data,
  status
});

const getSecretsFailure = (err, status) => ({
  type: GET_SECRETS_FAILURE,
  isFetching: false,
  err,
  status
});

const getSecretsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetSecrets = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getSecretsRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/secrets?docker`,
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
      dispatch(getSecretsSuccess(data, status));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getSecretsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getSecretsFailure(data.message, status));
      break;
    }
    default: {
      dispatch(getSecretsFailure(data.message, status));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetSecretsIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetSecrets(idName, axios));
