/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS,
  GET_NAMESPACES_FAILURE
} from '../../constants/namespacesConstants/getNamespaces';
import { webApiLogin } from '../../config/index';

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

const getNamespacesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetNamespaces = (
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getNamespacesRequest());

  const response = await axios.get(`${URL}/namespaces`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getNamespacesSuccess(data.namespaces ? data.namespaces : []));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getNamespacesInvalidToken());
      } else dispatch(getNamespacesFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getNamespacesFailure(data.message));
      dispatch(push('/login'));
    }
  }
};

export const fetchGetNamespacesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetNamespaces(axios));
