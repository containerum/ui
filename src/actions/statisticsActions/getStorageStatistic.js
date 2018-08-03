/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_STORAGE_STATISTIC_REQUESTING,
  GET_STORAGE_STATISTIC_SUCCESS
  // GET_STORAGE_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getStorageStatistic';
import { webApi, routerLinks } from '../../config';

const getStorageStatisticRequest = () => ({
  type: GET_STORAGE_STATISTIC_REQUESTING,
  isFetching: true
});

const getStorageStatisticSuccess = data => ({
  type: GET_STORAGE_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

// const getStorageStatisticFailure = err => ({
//   type: GET_STORAGE_STATISTIC_FAILURE,
//   isFetching: false,
//   err
// });

const getStorageStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetStorageStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getStorageStatisticRequest());

  const response = await axios
    .get(`${URL}/storage/current`, {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    })
    .catch(error => {
      console.log('error', error);
      return 'catch';
    });
  if (response !== 'catch') {
    const { status, data } = response;
    switch (status) {
      case 200: {
        dispatch(
          getStorageStatisticSuccess(data.storage ? data : { storage: 1 })
        );
        break;
      }
      case 400: {
        if (data.message === 'invalid token received') {
          dispatch(getStorageStatisticInvalidToken());
        } else if (data.message === 'invalid request body format') {
          dispatch(push(routerLinks.login));
        } else dispatch(getStorageStatisticSuccess({ storage: 1 }));
        // else dispatch(getStorageStatisticFailure(data.message));
        break;
      }
      default: {
        dispatch(getStorageStatisticSuccess({ storage: 1 }));
        // dispatch(getStorageStatisticFailure(data.message));
      }
    }
  } else dispatch(getStorageStatisticSuccess({ storage: 1 }));
};

export const fetchGetStorageStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetStorageStatistic(axios));
