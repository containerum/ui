/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_MEMORY_HISTORY_PER_NODES_STATISTIC_REQUESTING,
  GET_MEMORY_HISTORY_PER_NODES_STATISTIC_SUCCESS
  // GET_MEMORY_HISTORY_PER_NODES_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getMemoryHistoryPerNodesStatistic';
import { webApi, routerLinks } from '../../config';

const getMemoryHistoryPerNodesStatisticRequest = () => ({
  type: GET_MEMORY_HISTORY_PER_NODES_STATISTIC_REQUESTING,
  isFetching: true
});

const getMemoryHistoryPerNodesStatisticSuccess = data => ({
  type: GET_MEMORY_HISTORY_PER_NODES_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

// const getMemoryHistoryPerNodesStatisticFailure = err => ({
//   type: GET_MEMORY_HISTORY_PER_NODES_STATISTIC_FAILURE,
//   isFetching: false,
//   err
// });

const getMemoryHistoryPerNodesStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetMemoryHistoryPerNodesStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getMemoryHistoryPerNodesStatisticRequest());

  const response = await axios
    .get(`${URL}/memory/history/nodes`, {
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
        dispatch(getMemoryHistoryPerNodesStatisticSuccess(data));
        break;
      }
      case 400: {
        if (data.message === 'invalid token received') {
          dispatch(getMemoryHistoryPerNodesStatisticInvalidToken());
        } else if (data.message === 'invalid request body format') {
          dispatch(push(routerLinks.login));
        } else
          dispatch(
            getMemoryHistoryPerNodesStatisticSuccess({
              values: [1],
              labels: [new Date().toISOString()]
            })
          );
        // else dispatch(getMemoryHistoryPerNodesStatisticFailure(data.message));
        break;
      }
      default: {
        dispatch(
          getMemoryHistoryPerNodesStatisticSuccess({
            values: [1],
            labels: [new Date().toISOString()]
          })
        );
        // dispatch(getMemoryHistoryPerNodesStatisticFailure(data.message));
      }
    }
  } else
    dispatch(
      getMemoryHistoryPerNodesStatisticSuccess({
        values: [1],
        labels: [new Date().toISOString()]
      })
    );
};

export const fetchGetMemoryHistoryPerNodesStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetMemoryHistoryPerNodesStatistic(axios));
