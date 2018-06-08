/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  CREATE_NAMESPACE_REQUESTING,
  CREATE_NAMESPACE_SUCCESS,
  CREATE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/createNamespace';
// import isTokenExist from '../functions/isTokenExist';
import { webApi, routerLinks } from '../../config';

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

const createNamespaceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateNamespace = (
  idName: string,
  tariff: string,
  price: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createNamespaceRequest());

  const response = await axios.post(
    `${URL}/namespaces`,
    {
      label: idName,
      tariff_id: tariff
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
        // 'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  // console.log(data);
  switch (status) {
    case 201: {
      dispatch(createNamespaceSuccess(data, 201, config.method, idName));
      // if (
      //   typeof window !== 'undefined' &&
      //   typeof window.navigator !== 'undefined'
      // ) {
      //   ReactGA.event({
      //     category: 'UI',
      //     action: `UI_create_ns_${price}`
      //   });
      // }
      dispatch(push(routerLinks.namespaces));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createNamespaceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(createNamespaceFailure(data.message));
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
