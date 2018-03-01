/* @flow */

import _ from 'lodash/fp';

import {
  GET_PODS_INVALID,
  GET_PODS_REQUESTING,
  GET_PODS_SUCCESS,
  GET_PODS_FAILURE
} from '../../constants/podsConstants/getPods';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_PODS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PODS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_PODS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_PODS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_PODS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_PODS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_PODS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
