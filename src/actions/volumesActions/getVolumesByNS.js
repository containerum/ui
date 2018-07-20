/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_VOLUMES_BY_NS_REQUESTING,
  GET_VOLUMES_BY_NS_SUCCESS,
  GET_VOLUMES_BY_NS_FAILURE
} from '../../constants/volumesConstants/getVolumesByNS';
import { webApi, routerLinks } from '../../config';

const getVolumesByNSRequest = () => ({
  type: GET_VOLUMES_BY_NS_REQUESTING,
  isFetching: true
});

const getVolumesByNSSuccess = data => ({
  type: GET_VOLUMES_BY_NS_SUCCESS,
  isFetching: false,
  data
});

const getVolumesByNSFailure = err => ({
  type: GET_VOLUMES_BY_NS_FAILURE,
  isFetching: false,
  err
});

const getVolumesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetVolumesByNS = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(getVolumesByNSRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/volumes`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getVolumesByNSSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getVolumesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getVolumesByNSFailure(data.message));
      break;
    }
    default: {
      dispatch(getVolumesByNSFailure(data.message));
    }
  }
};

export const fetchGetVolumesByNSIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetVolumesByNS(idName, axios));
