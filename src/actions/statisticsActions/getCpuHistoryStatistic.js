/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_CPU_HISTORY_STATISTIC_REQUESTING,
  GET_CPU_HISTORY_STATISTIC_SUCCESS
  // GET_CPU_HISTORY_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getCpuHistoryStatistic';
import { webApi, routerLinks } from '../../config';

const getCpuHistoryStatisticRequest = () => ({
  type: GET_CPU_HISTORY_STATISTIC_REQUESTING,
  isFetching: true
});

const getCpuHistoryStatisticSuccess = data => ({
  type: GET_CPU_HISTORY_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

// const getCpuHistoryStatisticFailure = err => ({
//   type: GET_CPU_HISTORY_STATISTIC_FAILURE,
//   isFetching: false,
//   err
// });

const getCpuHistoryStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetCpuHistoryStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getCpuHistoryStatisticRequest());

  const response = await axios
    .get(`${URL}/cpu/history?step=1h`, {
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
        dispatch(getCpuHistoryStatisticSuccess(data));
        break;
      }
      case 400: {
        if (data.message === 'invalid token received') {
          dispatch(getCpuHistoryStatisticInvalidToken());
        } else if (data.message === 'invalid request body format') {
          dispatch(push(routerLinks.login));
        } else dispatch(getCpuHistoryStatisticSuccess({ cpu: 1 }));
        // else dispatch(getCpuHistoryStatisticFailure(data.message));
        break;
      }
      default: {
        dispatch(getCpuHistoryStatisticSuccess({ cpu: 1 }));
        // dispatch(getCpuHistoryStatisticFailure(data.message));
      }
    }
  } else dispatch(getCpuHistoryStatisticSuccess({ cpu: 1 }));
};

export const fetchGetCpuHistoryStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetCpuHistoryStatistic(axios));
