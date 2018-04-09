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
  GET_VOLUMES_TARIFFS_REQUESTING,
  GET_VOLUMES_TARIFFS_SUCCESS,
  GET_VOLUMES_TARIFFS_FAILURE
} from '../../constants/volumesConstants/getVolumesTariffs';
import { webApi } from '../../config/index';

const getVolumesTariffsRequest = () => ({
  type: GET_VOLUMES_TARIFFS_REQUESTING,
  isFetching: true
});

const getVolumesTariffsSuccess = data => ({
  type: GET_VOLUMES_TARIFFS_SUCCESS,
  isFetching: false,
  data
});

const getVolumesTariffsFailure = err => ({
  type: GET_VOLUMES_TARIFFS_FAILURE,
  isFetching: false,
  err
});

export const fetchGetVolumesTariffs = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getVolumesTariffsRequest());

  const response = await axios.get(`${URL}/api/volume_tariffs`, {
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
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      dispatch(getVolumesTariffsSuccess(data));
      break;
    }
    case 404: {
      dispatch(getVolumesTariffsSuccess([]));
      break;
    }
    case 401: {
      dispatch(getVolumesTariffsRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getVolumesTariffsFailure(data.message));
    }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchGetVolumesTariffs = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (
    state.getVolumesTariffsReducer.readyStatus === GET_VOLUMES_TARIFFS_SUCCESS
  )
    return false; // Preventing double fetching data

  return true;
};

// export const fetchGetVolumesTariffsIfNeeded = (): ThunkAction => (
//   dispatch: Dispatch,
//   getState: GetState,
//   axios: any
// ) => dispatch(fetchGetVolumesTariffs(axios));

/* istanbul ignore next */
export const fetchGetVolumesTariffsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldFetchGetVolumesTariffs(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchGetVolumesTariffs(axios));
  }

  /* istanbul ignore next */
  return null;
};
