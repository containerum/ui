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
  GET_VOLUMES_REQUESTING,
  GET_VOLUMES_SUCCESS
  // GET_VOLUMES_FAILURE
} from '../../constants/volumesConstants/getVolumes';
import { webApi } from '../../config/index';

const getVolumesRequest = () => ({
  type: GET_VOLUMES_REQUESTING,
  isFetching: true
});

const getVolumesSuccess = data => ({
  type: GET_VOLUMES_SUCCESS,
  isFetching: false,
  data
});

// const getVolumesFailure = err => ({
//   type: GET_VOLUMES_FAILURE,
//   isFetching: false,
//   err
// });

export const fetchGetVolumes = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getVolumesRequest());

  const response = await axios.get(`${URL}/api/volumes`, {
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
      dispatch(getVolumesSuccess(data));
      break;
    }
    case 404: {
      dispatch(getVolumesSuccess([]));
      break;
    }
    case 401: {
      dispatch(getVolumesRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getVolumesSuccess([]));
    }
    // default: {
    //   dispatch(getVolumesFailure(data.message));
    // }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetVolumes = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   if (state.getVolumesReducer.readyStatus === GET_VOLUMES_SUCCESS) return false; // Preventing double fetching data
//
//   return true;
// };

export const fetchGetVolumesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetVolumes(axios));

/* istanbul ignore next */
// export const fetchGetVolumesIfNeeded = (): ThunkAction => (
//   dispatch: Dispatch,
//   getState: GetState,
//   axios: any
// ) => {
//   /* istanbul ignore next */
//   if (shouldFetchGetVolumes(getState())) {
//     /* istanbul ignore next */
//     return dispatch(fetchGetVolumes(axios));
//   }
//
//   /* istanbul ignore next */
//   return null;
// };
