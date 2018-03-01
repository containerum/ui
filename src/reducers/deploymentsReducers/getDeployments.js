/* @flow */

import _ from 'lodash/fp';

import {
  GET_DEPLOYMENTS_INVALID,
  GET_DEPLOYMENTS_REQUESTING,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAILURE
} from '../../constants/deploymentsConstants/getDeployments';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_DEPLOYMENTS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_DEPLOYMENTS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_DEPLOYMENTS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_DEPLOYMENTS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_DEPLOYMENTS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_DEPLOYMENTS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_DEPLOYMENTS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
