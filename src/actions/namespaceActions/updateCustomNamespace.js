/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  UPDATE_CUSTOM_NAMESPACE_REQUESTING,
  UPDATE_CUSTOM_NAMESPACE_SUCCESS,
  UPDATE_CUSTOM_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/updateCustomNamespace';
import { webApi, routerLinks } from '../../config';

const updateNamespaceRequest = () => ({
  type: UPDATE_CUSTOM_NAMESPACE_REQUESTING,
  isFetching: true
});

const updateNamespaceSuccess = (data, status, method, label) => ({
  type: UPDATE_CUSTOM_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  label,
  method
});

const updateNamespaceFailure = (err, status) => ({
  type: UPDATE_CUSTOM_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status
});

const updateNamespaceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchUpdateCustomNamespace = (
  dataNS: Object,
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(updateNamespaceRequest());

  const {
    label,
    cpu,
    memory,
    maxExtServices: max_ext_services,
    maxIntServices: max_int_services,
    maxTraffic: max_traffic
  } = dataNS;
  const response = await axios.put(
    `${URL}/admin/namespaces/${idName}`,
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
    case 200: {
      dispatch(updateNamespaceSuccess(data, 202, config.method, label));
      dispatch(push(routerLinks.namespaces));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(updateNamespaceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(updateNamespaceFailure(data.message));
      break;
    }
    default: {
      dispatch(updateNamespaceFailure(data.message, status));
    }
  }
};

export const fetchUpdateCustomNamespaceIfNeeded = (
  dataNS: Object,
  idName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchUpdateCustomNamespace(dataNS, idName, axios));
