/* @flow */

import _ from 'lodash/fp';

import {
  GET_CPU_HISTORY_STATISTIC_INVALID,
  GET_CPU_HISTORY_STATISTIC_REQUESTING,
  GET_CPU_HISTORY_STATISTIC_SUCCESS,
  GET_CPU_HISTORY_STATISTIC_FAILURE
} from '../../constants/statisticsConstants/getCpuHistoryStatistic';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_CPU_HISTORY_STATISTIC_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_CPU_HISTORY_STATISTIC_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_CPU_HISTORY_STATISTIC_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_CPU_HISTORY_STATISTIC_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_CPU_HISTORY_STATISTIC_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_CPU_HISTORY_STATISTIC_FAILURE:
      return _.assign(state, {
        readyStatus: GET_CPU_HISTORY_STATISTIC_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
