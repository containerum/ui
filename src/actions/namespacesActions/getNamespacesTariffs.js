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
import { webApi } from '../../config/index';

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

export const fetchGetNamespacesTariffs = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log('token', token, 'browser', browser);

  dispatch(getNamespacesTariffsRequest());

  const response = await axios.get(`${URL}/api/namespace_tariffs`, {
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
  const { status, data } = response;
  switch (status) {
    case 200: {
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      dispatch(getNamespacesTariffsSuccess(data));
      break;
    }
    case 404: {
      dispatch(getNamespacesTariffsSuccess([]));
      break;
    }
    case 401: {
      dispatch(getNamespacesTariffsRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getNamespacesTariffsFailure(data.message));
    }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchGetNamespacesTariffs = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (
    state.getNamespacesTariffsReducer.readyStatus ===
    GET_NAMESPACES_TARIFFS_SUCCESS
  )
    return false; // Preventing double fetching data

  return true;
};

// export const fetchGetNamespacesTariffsIfNeeded = (): ThunkAction => (
//   dispatch: Dispatch,
//   getState: GetState,
//   axios: any
// ) => dispatch(fetchGetNamespacesTariffs(axios));

/* istanbul ignore next */
export const fetchGetNamespacesTariffsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldFetchGetNamespacesTariffs(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchGetNamespacesTariffs(axios));
  }

  /* istanbul ignore next */
  return null;
};
