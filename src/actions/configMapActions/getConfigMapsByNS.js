/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_CONFIG_MAPS_BY_NS_REQUESTING,
  GET_CONFIG_MAPS_BY_NS_SUCCESS,
  GET_CONFIG_MAPS_BY_NS_FAILURE
} from '../../constants/configMapConstants/getConfigMapsByNS';
// import isTokenExist from '../functions/isTokenExist';
import { webApi, routerLinks } from '../../config';

const getConfigMapsByNSRequest = () => ({
  type: GET_CONFIG_MAPS_BY_NS_REQUESTING,
  isFetching: true
});

const getConfigMapsByNSSuccess = (data, status) => ({
  type: GET_CONFIG_MAPS_BY_NS_SUCCESS,
  isFetching: false,
  data,
  status
});

const getConfigMapsByNSFailure = (err, status) => ({
  type: GET_CONFIG_MAPS_BY_NS_FAILURE,
  isFetching: false,
  err,
  status
});

const getConfigMapsByNSInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetConfigMapsByNS = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getConfigMapsByNSRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/configmaps`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getConfigMapsByNSSuccess(data.configmaps, status));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getConfigMapsByNSInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getConfigMapsByNSFailure(data.message, status));
      break;
    }
    default: {
      dispatch(getConfigMapsByNSFailure(data.message, status));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetConfigMapsByNSIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetConfigMapsByNS(idName, axios));
