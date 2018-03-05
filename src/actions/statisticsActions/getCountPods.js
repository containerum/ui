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
  GET_COUNT_PODS_REQUESTING,
  GET_COUNT_PODS_SUCCESS
  // GET_COUNT_PODS_FAILURE
} from '../../constants/statisticsConstants/getCountPodsConstants';
import { webApi } from '../../config/index';

const getCountPodsRequest = () => ({
  type: GET_COUNT_PODS_REQUESTING,
  isFetching: true
});

const getCountPodsSuccess = data => ({
  type: GET_COUNT_PODS_SUCCESS,
  isFetching: false,
  data
});

// const getCountPodsFailure = err => ({
//   type: GET_COUNT_PODS_FAILURE,
//   isFetching: false,
//   err
// });

export const fetchGetCountPods = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getCountPodsRequest());

  const response = await axios.get(`${URL}/api/count/pods`, {
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
      dispatch(getCountPodsSuccess(data));
      break;
    }
    case 401: {
      dispatch(getCountPodsRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getCountPodsSuccess({ count: 'no data' }));
    }
    // default: {
    //   dispatch(getCountPodsFailure(data.message));
    // }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetCountPods = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   console.log(state);
//   if (state.getCountPodsReducer.readyStatus === GET_COUNT_PODS_SUCCESS)
//     return false; // Preventing double fetching data
//
//   return true;
// };

/* istanbul ignore next */
export const fetchGetCountPodsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) =>
  /* istanbul ignore next */
  // if (shouldFetchGetCountPods(getState())) {
  /* istanbul ignore next */
  dispatch(fetchGetCountPods(axios));
// }

/* istanbul ignore next */
// return null;
