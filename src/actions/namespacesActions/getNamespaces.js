/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type {
  Dispatch,
  GetState,
  ThunkAction
  // ReduxState
} from '../../types/index';
import {
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS,
  GET_NAMESPACES_FAILURE
} from '../../constants/namespacesConstants/getNamespaces';
import { webApi } from '../../config/index';

const getNamespacesRequest = () => ({
  type: GET_NAMESPACES_REQUESTING,
  isFetching: true
});

const getNamespacesSuccess = data => ({
  type: GET_NAMESPACES_SUCCESS,
  isFetching: false,
  data
});

const getNamespacesFailure = err => ({
  type: GET_NAMESPACES_FAILURE,
  isFetching: false,
  err
});

export const fetchGetNamespaces = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getNamespacesRequest());

  const response = await axios.get(`${URL}/api/namespaces`, {
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
      dispatch(getNamespacesSuccess(data));
      break;
    }
    case 404: {
      dispatch(getNamespacesSuccess([]));
      break;
    }
    case 401: {
      dispatch(getNamespacesFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getNamespacesSuccess([]));
    }
    // default: {
    //   dispatch(getNamespacesFailure(data.message));
    // }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetNamespaces = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   console.log(state);
//   if (state.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS)
//     return false; // Preventing double fetching data
//
//   return true;
// };

/* istanbul ignore next */
export const fetchGetNamespacesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) =>
  /* istanbul ignore next */
  // if (shouldFetchGetNamespaces(getState())) {
  /* istanbul ignore next */
  dispatch(fetchGetNamespaces(axios));
// }

/* istanbul ignore next */
// return null;
