/* @flow */

import _ from 'lodash/fp';

import {
  GET_COUNT_DEPLOYMENTS_INVALID,
  GET_COUNT_DEPLOYMENTS_REQUESTING,
  GET_COUNT_DEPLOYMENTS_SUCCESS,
  GET_COUNT_DEPLOYMENTS_FAILURE
} from '../../constants/statisticsConstants/getCountDeploymentsConstants';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_COUNT_DEPLOYMENTS_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_COUNT_DEPLOYMENTS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_COUNT_DEPLOYMENTS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_COUNT_DEPLOYMENTS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_COUNT_DEPLOYMENTS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_COUNT_DEPLOYMENTS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_COUNT_DEPLOYMENTS_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
