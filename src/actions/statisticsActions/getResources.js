/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_RESOURCES_REQUESTING,
  GET_RESOURCES_SUCCESS,
  GET_RESOURCES_FAILURE
} from '../../constants/statisticsConstants/getResourcesConstants';
import { webApi, routerLinks } from '../../config';

const getResourcesRequest = () => ({
  type: GET_RESOURCES_REQUESTING,
  isFetching: true
});

const getResourcesSuccess = data => ({
  type: GET_RESOURCES_SUCCESS,
  isFetching: false,
  data
});

const getResourcesFailure = err => ({
  type: GET_RESOURCES_FAILURE,
  isFetching: false,
  err
});

const getResourcesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetResources = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getResourcesRequest());

  const response = await axios.get(`${URL}/resources`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getResourcesSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getResourcesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getResourcesFailure(data.message));
      break;
    }
    default: {
      dispatch(
        getResourcesSuccess({
          containers: 'no data',
          deployments: 'no data',
          external_services: 'no data',
          ingresses: 'no data',
          internal_services: 'no data',
          namespaces: 'no data',
          pods: 'no data',
          volumes: 'no data'
        })
      );
    }
    // default: {
    //   dispatch(getResourcesFailure(data.message));
    // }
  }
};

export const fetchGetResourcesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetResources(axios));
