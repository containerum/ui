/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_MEMORY_HISTORY_STATISTIC_REQUESTING,
  GET_MEMORY_HISTORY_STATISTIC_SUCCESS
  // GET_MEMORY_HISTORY_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getMemoryHistoryStatistic';
import { webApi, routerLinks } from '../../config';

const getMemoryHistoryStatisticRequest = () => ({
  type: GET_MEMORY_HISTORY_STATISTIC_REQUESTING,
  isFetching: true
});

const getMemoryHistoryStatisticSuccess = data => ({
  type: GET_MEMORY_HISTORY_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

// const getMemoryHistoryStatisticFailure = err => ({
//   type: GET_MEMORY_HISTORY_STATISTIC_FAILURE,
//   isFetching: false,
//   err
// });

const getMemoryHistoryStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetMemoryHistoryStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getMemoryHistoryStatisticRequest());

  const response = await axios
    .get(`${URL}/memory/history`, {
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
        dispatch(getMemoryHistoryStatisticSuccess(data));
        break;
      }
      case 400: {
        if (data.message === 'invalid token received') {
          dispatch(getMemoryHistoryStatisticInvalidToken());
        } else if (data.message === 'invalid request body format') {
          dispatch(push(routerLinks.login));
        } else
          dispatch(
            getMemoryHistoryStatisticSuccess({
              values: [1],
              labels: [new Date().toISOString()]
            })
          );
        // else dispatch(getMemoryHistoryStatisticFailure(data.message));
        break;
      }
      default: {
        dispatch(
          getMemoryHistoryStatisticSuccess({
            values: [1],
            labels: [new Date().toISOString()]
          })
        );
        // dispatch(getMemoryHistoryStatisticFailure(data.message));
      }
    }
  } else
    dispatch(
      getMemoryHistoryStatisticSuccess({
        values: [1],
        labels: [new Date().toISOString()]
      })
    );
};

export const fetchGetMemoryHistoryStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetMemoryHistoryStatistic(axios));
