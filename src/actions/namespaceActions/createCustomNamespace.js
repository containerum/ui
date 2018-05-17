/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_CUSTOM_NAMESPACE_REQUESTING,
  CREATE_CUSTOM_NAMESPACE_SUCCESS,
  CREATE_CUSTOM_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/createCustomNamespace';
// import { webApi } from '../../config/index';

const createNamespaceRequest = () => ({
  type: CREATE_CUSTOM_NAMESPACE_REQUESTING,
  isFetching: true
});

const createNamespaceSuccess = (data, status, method) => ({
  type: CREATE_CUSTOM_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  method
});

const createNamespaceFailure = (err, status) => ({
  type: CREATE_CUSTOM_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status
});

const createNamespaceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateCustomNamespace = (
  dataNS: Object,
  axios: any
  // URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createNamespaceRequest());

  const {
    label,
    cpu,
    memory,
    maxExtServices: max_ext_services,
    maxIntServices: max_int_services,
    maxTraffic: max_traffic
  } = dataNS;
  const response = await axios.post(
    'https://192.168.88.210:4242/admin/namespaces',
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
  console.log(status, data);
  switch (status) {
    case 200: {
      dispatch(createNamespaceSuccess(data, 201, config.method));
      // if (
      //   typeof window !== 'undefined' &&
      //   typeof window.navigator !== 'undefined'
      // ) {
      //   ReactGA.event({
      //     category: 'UI',
      //     action: `UI_create_ns_${price}`
      //   });
      // }
      dispatch(push('/namespaces'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createNamespaceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(createNamespaceFailure(data.message));
      break;
    }
    default: {
      dispatch(createNamespaceFailure(data.message, status));
    }
  }
};

export const fetchCreateCustomNamespaceIfNeeded = (
  dataNS: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateCustomNamespace(dataNS, axios));
