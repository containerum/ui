/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_NAMESPACE_ACCESS_REQUESTING,
  GET_NAMESPACE_ACCESS_SUCCESS,
  GET_NAMESPACE_ACCESS_FAILURE
} from '../../constants/namespaceConstants/getNamespaceAccess';
// import isTokenExist from '../functions/isTokenExist';
import { webApiLogin } from '../../config/index';

const getNamespaceAccessRequest = () => ({
  type: GET_NAMESPACE_ACCESS_REQUESTING,
  isFetching: true
});

const getNamespaceAccessSuccess = (data, status, idName) => ({
  type: GET_NAMESPACE_ACCESS_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getNamespaceAccessFailure = (err, status, idName) => ({
  type: GET_NAMESPACE_ACCESS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const getNamespaceAccessInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetNamespaceAccess = (
  idName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getNamespaceAccessRequest());

  const response = await axios.get(`${URL}/namespace/${idName}/access`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getNamespaceAccessSuccess(data, status, idName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getNamespaceAccessInvalidToken());
      } else dispatch(getNamespaceAccessFailure(data.message, status, idName));
      break;
    }
    default: {
      dispatch(getNamespaceAccessFailure(data.message, status, idName));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetNamespaceAccessIfNeeded = (
  idName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetNamespaceAccess(idName, axios));
