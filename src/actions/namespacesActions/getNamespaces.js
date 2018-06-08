/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS,
  GET_NAMESPACES_FAILURE
} from '../../constants/namespacesConstants/getNamespaces';
import { webApi, routerLinks } from '../../config';

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
  role: string,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(getNamespacesRequest());
  let response;

  switch (role) {
    case 'admin': {
      response = await axios.get(`${URL}/${role}/namespaces`, {
        headers: {
          'User-Client': browser,
          'User-Token': accessToken
        },
        validateStatus: status => status >= 200 && status <= 505
      });
      break;
    }

    case 'user': {
      response = await axios.get(`${URL}/namespaces`, {
        headers: {
          'User-Client': browser,
          'User-Token': accessToken
        },
        validateStatus: status => status >= 200 && status <= 505
      });
      break;
    }

    default: {
      response = await axios.get(`${URL}/namespaces`, {
        headers: {
          'User-Client': browser,
          'User-Token': accessToken
        },
        validateStatus: status => status >= 200 && status <= 505
      });
      break;
    }
  }

  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getNamespacesSuccess(data.namespaces));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getNamespacesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getNamespacesFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getNamespacesFailure(data.message));
      dispatch(push(routerLinks.login));
    }
  }
};

export const fetchGetNamespacesIfNeeded = (role: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetNamespaces(axios, role));
