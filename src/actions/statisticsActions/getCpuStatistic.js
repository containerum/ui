/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_CPU_STATISTIC_REQUESTING,
  GET_CPU_STATISTIC_SUCCESS,
  GET_CPU_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getCpuStatistic';
import { webApi, routerLinks } from '../../config';

const getCpuStatisticRequest = () => ({
  type: GET_CPU_STATISTIC_REQUESTING,
  isFetching: true
});

const getCpuStatisticSuccess = data => ({
  type: GET_CPU_STATISTIC_SUCCESS,
  isFetching: false,
  data
});

const getCpuStatisticFailure = err => ({
  type: GET_CPU_STATISTIC_FAILURE,
  isFetching: false,
  err
});

const getCpuStatisticInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetCpuStatistic = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getCpuStatisticRequest());

  const response = await axios.get(`${URL}/cpu/current`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getCpuStatisticSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getCpuStatisticInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getCpuStatisticFailure(data.message));
      break;
    }
    default: {
      dispatch(getCpuStatisticFailure(data.message));
    }
  }
};

export const fetchGetCpuStatisticIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetCpuStatistic(axios));
