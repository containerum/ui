/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_NAMESPACE_REQUESTING,
  CREATE_NAMESPACE_SUCCESS,
  CREATE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/createNamespace';
// import isTokenExist from '../functions/isTokenExist';
import { webApi } from '../../config/index';

// const isServer = typeof window === 'undefined';
// const ReactGA = isServer ? require('react-ga') : null;

const createNamespaceRequest = () => ({
  type: CREATE_NAMESPACE_REQUESTING,
  isFetching: true
});

const createNamespaceSuccess = (data, status, method, idName) => ({
  type: CREATE_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const createNamespaceFailure = (err, status, idName) => ({
  type: CREATE_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

export const fetchCreateNamespace = (
  idName: string,
  tariff: string,
  price: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(createNamespaceRequest());

  const response = await axios.post(
    `${URL}/api/namespaces`,
    {
      label: idName,
      tariff_label: tariff
    },
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 201: {
      dispatch(createNamespaceSuccess(data, status, config.method, idName));
      // if (
      //   typeof window !== 'undefined' &&
      //   typeof window.navigator !== 'undefined'
      // ) {
      //   ReactGA.event({
      //     category: 'UI',
      //     action: `UI_create_ns_${price}`
      //   });
      // }
      dispatch(push('/'));
      break;
    }
    case 401: {
      dispatch(createNamespaceFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(createNamespaceFailure(data.message, status, idName));
    }
  }
};

export const fetchCreateNamespaceIfNeeded = (
  idName: string,
  tariff: string,
  price: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateNamespace(idName, tariff, price, axios));
