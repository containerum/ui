/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  CREATE_CUSTOM_NAMESPACE_REQUESTING,
  CREATE_CUSTOM_NAMESPACE_SUCCESS,
  CREATE_CUSTOM_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/createCustomNamespace';
import { webApi, routerLinks } from '../../config';

const createCustomNamespaceRequest = () => ({
  type: CREATE_CUSTOM_NAMESPACE_REQUESTING,
  isFetching: true
});

const createCustomNamespaceSuccess = (data, status, method, idName) => ({
  type: CREATE_CUSTOM_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const createCustomNamespaceFailure = (err, status, idName) => ({
  type: CREATE_CUSTOM_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const createCustomNamespaceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateCustomNamespace = (
  dataNS: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createCustomNamespaceRequest());

  const {
    label,
    cpu,
    memory,
    maxExtServices: max_ext_services,
    maxIntServices: max_int_services,
    maxTraffic: max_traffic
  } = dataNS;
  const response = await axios.post(
    `${URL}/admin/namespaces`,
    {
      label,
      cpu,
      memory,
      max_ext_services,
      max_int_services,
      max_traffic
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 201: {
      dispatch(
        createCustomNamespaceSuccess(data, status, config.method, label)
      );
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
        dispatch(createCustomNamespaceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(createCustomNamespaceFailure(data.message));
      break;
    }
    default: {
      dispatch(createCustomNamespaceFailure(data.message, status));
    }
  }
};

export const fetchCreateCustomNamespaceIfNeeded = (
  dataNS: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateCustomNamespace(dataNS, axios));
