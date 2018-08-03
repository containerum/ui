/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_INGRESSES_REQUESTING,
  GET_INGRESSES_SUCCESS,
  GET_INGRESSES_FAILURE
} from '../../constants/serviceConstants/getDomains';
import { webApi, routerLinks } from '../../config/index';

const getIngressesRequest = () => ({
  type: GET_INGRESSES_REQUESTING,
  isFetching: true
});

const getIngressesSuccess = data => ({
  type: GET_INGRESSES_SUCCESS,
  isFetching: false,
  data
});

const getIngressesFailure = err => ({
  type: GET_INGRESSES_FAILURE,
  isFetching: false,
  err
});

const getIngressesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetIngresses = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(getIngressesRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/ingresses`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getIngressesSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getIngressesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getIngressesFailure(data.message));
      break;
    }
    default: {
      dispatch(getIngressesFailure(data.message));
    }
  }
};

export const fetchGetIngressesIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetIngresses(idName, axios));
