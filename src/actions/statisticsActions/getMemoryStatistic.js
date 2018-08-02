/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_MEMORY_STATISTIC_REQUESTING,
  GET_MEMORY_STATISTIC_SUCCESS
  // GET_MEMORY_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getMemoryStatistic';
import { webApi, routerLinks } from '../../config';

const getMemoryStatisticRequest = () => ({
  type: GET_MEMORY_STATISTIC_REQUESTING,
  isFetching: true
});

const getMemoryStatisticSuccess = data => ({
  type: GET_MEMORY_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

// const getMemoryStatisticFailure = err => ({
//   type: GET_MEMORY_STATISTIC_FAILURE,
//   isFetching: false,
//   err
// });

const getMemoryStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetMemoryStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getMemoryStatisticRequest());

  const response = await axios
    .get(`${URL}/memory/current`, {
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
        dispatch(getMemoryStatisticSuccess(data.memory ? data : { memory: 1 }));
        break;
      }
      case 400: {
        if (data.message === 'invalid token received') {
          dispatch(getMemoryStatisticInvalidToken());
        } else if (data.message === 'invalid request body format') {
          dispatch(push(routerLinks.login));
        } else dispatch(getMemoryStatisticSuccess({ memory: 1 }));
        // else dispatch(getMemoryStatisticFailure(data.message));
        break;
      }
      default: {
        dispatch(getMemoryStatisticSuccess({ memory: 1 }));
        // dispatch(getMemoryStatisticFailure(data.message));
      }
    }
  } else dispatch(getMemoryStatisticSuccess({ memory: 1 }));
};

export const fetchGetMemoryStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetMemoryStatistic(axios));
