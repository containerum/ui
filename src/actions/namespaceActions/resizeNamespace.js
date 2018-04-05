/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  RESIZE_NAMESPACE_REQUESTING,
  RESIZE_NAMESPACE_SUCCESS,
  RESIZE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/resizeNamespace';
// import isTokenExist from '../functions/isTokenExist';
import { webApiLogin } from '../../config/index';

const resizeNamespaceRequest = () => ({
  type: RESIZE_NAMESPACE_REQUESTING,
  isFetching: true
});

const resizeNamespaceSuccess = (data, status, method, idName) => ({
  type: RESIZE_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const resizeNamespaceFailure = (err, status, idName) => ({
  type: RESIZE_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

export const fetchResizeNamespace = (
  idName: string,
  tariff: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(resizeNamespaceRequest());

  const response = await axios.put(
    `${URL}/namespace/${idName}`,
    {
      tariff_id: tariff
    },
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'User-Token': accessToken
        // 'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(resizeNamespaceSuccess(data, 202, config.method, idName));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(resizeNamespaceFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(resizeNamespaceFailure(data.message, status, idName));
    }
  }
};

export const fetchResizeNamespaceIfNeeded = (
  idName: string,
  tariff: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchResizeNamespace(idName, tariff, axios));
