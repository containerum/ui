/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_CPU_HISTORY_PER_NODES_STATISTIC_REQUESTING,
  GET_CPU_HISTORY_PER_NODES_STATISTIC_SUCCESS
  // GET_CPU_HISTORY_PER_NODES_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getCpuHistoryPerNodesStatistic';
import { webApi, routerLinks } from '../../config';

const getCpuHistoryPerNodesStatisticRequest = () => ({
  type: GET_CPU_HISTORY_PER_NODES_STATISTIC_REQUESTING,
  isFetching: true
});

const getCpuHistoryPerNodesStatisticSuccess = data => ({
  type: GET_CPU_HISTORY_PER_NODES_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

// const getCpuHistoryPerNodesStatisticFailure = err => ({
//   type: GET_CPU_HISTORY_PER_NODES_STATISTIC_FAILURE,
//   isFetching: false,
//   err
// });

const getCpuHistoryPerNodesStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetCpuHistoryPerNodesStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getCpuHistoryPerNodesStatisticRequest());

  const response = await axios
    .get(`${URL}/cpu/history/nodes`, {
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
        dispatch(getCpuHistoryPerNodesStatisticSuccess(data));
        break;
      }
      case 400: {
        if (data.message === 'invalid token received') {
          dispatch(getCpuHistoryPerNodesStatisticInvalidToken());
        } else if (data.message === 'invalid request body format') {
          dispatch(push(routerLinks.login));
        } else
          dispatch(
            getCpuHistoryPerNodesStatisticSuccess({
              noData: {
                values: [1],
                labels: [new Date().toISOString()]
              }
            })
          );
        // else dispatch(getCpuHistoryPerNodesStatisticFailure(data.message));
        break;
      }
      default: {
        dispatch(
          getCpuHistoryPerNodesStatisticSuccess({
            noData: {
              values: [1],
              labels: [new Date().toISOString()]
            }
          })
        );
        // dispatch(getCpuHistoryPerNodesStatisticFailure(data.message));
      }
    }
  } else
    dispatch(
      getCpuHistoryPerNodesStatisticSuccess({
        noData: {
          values: [1],
          labels: [new Date().toISOString()]
        }
      })
    );
};

export const fetchGetCpuHistoryPerNodesStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetCpuHistoryPerNodesStatistic(axios));
