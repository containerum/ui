/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../../types';
import {
  GET_NAMESPACES_TARIFFS_REQUESTING,
  GET_NAMESPACES_TARIFFS_SUCCESS,
  GET_NAMESPACES_TARIFFS_FAILURE
} from '../../constants/namespacesConstants/getNamespacesTariffs';
import { webApi, routerLinks } from '../../config';

const getNamespacesTariffsRequest = () => ({
  type: GET_NAMESPACES_TARIFFS_REQUESTING,
  isFetching: true
});

const getNamespacesTariffsSuccess = data => ({
  type: GET_NAMESPACES_TARIFFS_SUCCESS,
  isFetching: false,
  data
});

const getNamespacesTariffsFailure = err => ({
  type: GET_NAMESPACES_TARIFFS_FAILURE,
  isFetching: false,
  err
});

const getNamespacesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetNamespacesTariffs = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getNamespacesTariffsRequest());

  const response = await axios.get(`${URL}/tariffs/namespace`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      dispatch(getNamespacesTariffsSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getNamespacesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getNamespacesTariffsFailure(data.message));
      break;
    }
    default: {
      dispatch(getNamespacesTariffsFailure(data.message));
      dispatch(push(routerLinks.login));
    }
  }
};

const shouldFetchGetNamespacesTariffs = (state: ReduxState): boolean => {
  if (__DEV__) return true;

  if (
    state.getNamespacesTariffsReducer.readyStatus ===
    GET_NAMESPACES_TARIFFS_SUCCESS
  )
    return false;

  return true;
};

export const fetchGetNamespacesTariffsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchGetNamespacesTariffs(getState())) {
    return dispatch(fetchGetNamespacesTariffs(axios));
  }
  return null;
};
