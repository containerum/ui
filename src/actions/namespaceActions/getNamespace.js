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
import { webApi } from '../../config/index';

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

export const fetchGetNamespace = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getNamespaceRequest());

  const response = await axios.get(`${URL}/api/namespaces/${idName}`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
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
      dispatch(getNamespaceFailure(data.message));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(getNamespaceFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getNamespaceFailure(data.message, status, idName));
    }
  }
};

export const fetchGetNamespaceIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetNamespace(idName, axios));
