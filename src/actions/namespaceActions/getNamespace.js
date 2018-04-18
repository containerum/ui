/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_NAMESPACE_REQUESTING,
  GET_NAMESPACE_SUCCESS,
  GET_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/getNamespace';
// import isTokenExist from '../functions/isTokenExist';
import { webApiLogin } from '../../config/index';

const getNamespaceRequest = () => ({
  type: GET_NAMESPACE_REQUESTING,
  isFetching: true
});

const getNamespaceSuccess = (data, status, idName) => ({
  type: GET_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getNamespaceFailure = (err, status, idName) => ({
  type: GET_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const getNamespaceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetNamespace = (
  idName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getNamespaceRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getNamespaceSuccess(data, status, idName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getNamespaceInvalidToken());
      } else dispatch(getNamespaceFailure(data.message, status, idName));
      break;
    }
    default: {
      dispatch(getNamespaceFailure(data.message, status, idName));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetNamespaceIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetNamespace(idName, axios));
