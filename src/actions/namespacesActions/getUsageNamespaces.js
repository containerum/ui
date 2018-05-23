/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_NAMESPACES_USAGE_REQUESTING,
  GET_NAMESPACES_USAGE_SUCCESS,
  GET_NAMESPACES_USAGE_FAILURE
} from '../../constants/namespacesConstants/getUsageNamespaces';
import { webApi } from '../../config/index';

const getUsageNamespacesRequest = () => ({
  type: GET_NAMESPACES_USAGE_REQUESTING,
  isFetching: true
});

const getUsageNamespacesSuccess = data => ({
  type: GET_NAMESPACES_USAGE_SUCCESS,
  isFetching: false,
  data
});

const getUsageNamespacesFailure = err => ({
  type: GET_NAMESPACES_USAGE_FAILURE,
  isFetching: false,
  err
});

const getUsageNamespacesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetUsageNamespaces = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getUsageNamespacesRequest());

  const response = await axios.get(`${URL}/usage/namespaces`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getUsageNamespacesSuccess(data.namespaces));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getUsageNamespacesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getUsageNamespacesFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getUsageNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getUsageNamespacesFailure(data.message));
      dispatch(push('/login'));
    }
  }
};

export const fetchGetUsageNamespacesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetUsageNamespaces(axios));
