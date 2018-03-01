/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_NAMESPACE_REQUESTING,
  DELETE_NAMESPACE_SUCCESS,
  DELETE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/deleteNamespace';
import { webApi } from '../../config';

const deleteNamespaceRequest = () => ({
  type: DELETE_NAMESPACE_REQUESTING,
  isFetching: true
});

const deleteNamespaceSuccess = (data, status, method, idName) => ({
  type: DELETE_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const deleteNamespaceFailure = (err, status, idName) => ({
  type: DELETE_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

export const fetchDeleteNamespace = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(deleteNamespaceRequest());

  const response = await axios.delete(`${URL}/api/namespaces/${idName}`, {
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
  const { data, status, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteNamespaceSuccess(data, status, config.method, idName));
      break;
    }
    case 401: {
      dispatch(deleteNamespaceFailure(data.message, status, idName));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(deleteNamespaceFailure(data.message, status, idName));
    }
  }
};

export const fetchDeleteNamespaceIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeleteNamespace(idName, axios));
