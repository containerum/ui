/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type {
  Dispatch,
  GetState,
  ThunkAction,
  ReduxState
} from '../../types/index';
import {
  GET_NAMESPACES_TARIFFS_REQUESTING,
  GET_NAMESPACES_TARIFFS_SUCCESS,
  GET_NAMESPACES_TARIFFS_FAILURE
} from '../../constants/namespacesConstants/getNamespacesTariffs';
import { webApiLogin } from '../../config/index';

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
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

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
      } else dispatch(getNamespacesTariffsFailure(data.message));
      break;
    }
    default: {
      dispatch(getNamespacesTariffsFailure(data.message));
      dispatch(push('/login'));
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
