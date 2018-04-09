/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_NAMESPACE_REQUESTING,
  DELETE_NAMESPACE_SUCCESS,
  DELETE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/deleteNamespace';
import { webApiLogin } from '../../config';

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
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(deleteNamespaceRequest());

  const response = await axios.delete(`${URL}/namespace/${idName}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { data, status, config } = response;
  // console.log(data);
  switch (status) {
    case 200: {
      dispatch(deleteNamespaceSuccess(data, 202, config.method, idName));
      break;
    }
    case 400: {
      dispatch(deleteNamespaceFailure(data.message, status, idName));
      if (data.message === 'invalid token received') {
        dispatch(push('/login'));
      }
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
