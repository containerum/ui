/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_VOLUMES_BY_NS_REQUESTING,
  GET_VOLUMES_BY_NS_SUCCESS,
  GET_VOLUMES_BY_NS_FAILURE
} from '../../constants/volumesConstants/getVolumesByNS';
import { webApi } from '../../config/index';

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
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getVolumesByNSRequest());

  const response = await axios.get(`${URL}/api/namespaces/${idName}/volumes`, {
    headers: {
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
      dispatch(getVolumesByNSSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getVolumesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getVolumesByNSFailure(data.message));
      break;
    }
    default: {
      dispatch(getVolumesByNSFailure(data.message));
    }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetVolumesByNS = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   if (state.getVolumesByNSReducer.readyStatus === GET_VOLUMES_BY_NS_SUCCESS) return false; // Preventing double fetching data
//
//   return true;
// };

export const fetchGetVolumesByNSIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetVolumesByNS(idName, axios));

/* istanbul ignore next */
// export const fetchGetVolumesByNSIfNeeded = (): ThunkAction => (
//   dispatch: Dispatch,
//   getState: GetState,
//   axios: any
// ) => {
//   /* istanbul ignore next */
//   if (shouldFetchGetVolumesByNS(getState())) {
//     /* istanbul ignore next */
//     return dispatch(fetchGetVolumesByNS(axios));
//   }
//
//   /* istanbul ignore next */
//   return null;
// };
