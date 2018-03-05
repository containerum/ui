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
  GET_COUNT_SERVICES_REQUESTING,
  GET_COUNT_SERVICES_SUCCESS
  // GET_COUNT_SERVICES_FAILURE
} from '../../constants/statisticsConstants/getCountServicesConstants';
import { webApi } from '../../config/index';

const getCountServicesRequest = () => ({
  type: GET_COUNT_SERVICES_REQUESTING,
  isFetching: true
});

const getCountServicesSuccess = data => ({
  type: GET_COUNT_SERVICES_SUCCESS,
  isFetching: false,
  data
});

// const getCountServicesFailure = err => ({
//   type: GET_COUNT_SERVICES_FAILURE,
//   isFetching: false,
//   err
// });

export const fetchGetCountServices = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getCountServicesRequest());

  const response = await axios.get(`${URL}/api/count/services`, {
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
      dispatch(getCountServicesSuccess(data));
      break;
    }
    case 401: {
      dispatch(getCountServicesRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getCountServicesSuccess({ count: 'no data' }));
    }
    // default: {
    //   dispatch(getCountServicesFailure(data.message));
    // }
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetCountServices = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   console.log(state);
//   if (state.getCountServicesReducer.readyStatus === GET_COUNT_SERVICES_SUCCESS)
//     return false; // Preventing double fetching data
//
//   return true;
// };

/* istanbul ignore next */
export const fetchGetCountServicesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) =>
  /* istanbul ignore next */
  // if (shouldFetchGetCountServices(getState())) {
  /* istanbul ignore next */
  dispatch(fetchGetCountServices(axios));
// }

/* istanbul ignore next */
// return null;
