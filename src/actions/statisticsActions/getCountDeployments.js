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
  GET_COUNT_DEPLOYMENTS_REQUESTING,
  GET_COUNT_DEPLOYMENTS_SUCCESS
  // GET_COUNT_DEPLOYMENTS_FAILURE
} from '../../constants/statisticsConstants/getCountDeploymentsConstants';
import { webApi } from '../../config/index';

const getCountDeploymentsRequest = () => ({
  type: GET_COUNT_DEPLOYMENTS_REQUESTING,
  isFetching: true
});

const getCountDeploymentsSuccess = data => ({
  type: GET_COUNT_DEPLOYMENTS_SUCCESS,
  isFetching: false,
  data
});

// const getCountDeploymentsFailure = err => ({
//   type: GET_COUNT_DEPLOYMENTS_FAILURE,
//   isFetching: false,
//   err
// });

export const fetchGetCountDeployments = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getCountDeploymentsRequest());

  const response = await axios.get(`${URL}/api/count/deployments`, {
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
      dispatch(getCountDeploymentsSuccess(data));
      break;
    }
    case 401: {
      dispatch(getCountDeploymentsRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getCountDeploymentsSuccess({ count: 'no data' }));
    }
    // default: {
    //   dispatch(getCountDeploymentsFailure(data.message));
    // }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetCountDeployments = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   console.log(state);
//   if (state.getCountDeploymentsReducer.readyStatus === GET_COUNT_DEPLOYMENTS_SUCCESS)
//     return false; // Preventing double fetching data
//
//   return true;
// };

/* istanbul ignore next */
export const fetchGetCountDeploymentsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) =>
  /* istanbul ignore next */
  // if (shouldFetchGetCountDeployments(getState())) {
  /* istanbul ignore next */
  dispatch(fetchGetCountDeployments(axios));
// }

/* istanbul ignore next */
// return null;
