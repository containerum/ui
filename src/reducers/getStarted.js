/* @flow */

import _ from 'lodash/fp';

import {
  GET_STARTED_INVALID,
  GET_STARTED_REQUESTING,
  GET_STARTED_SUCCESS,
  GET_STARTED_FAILURE
} from '../constants/getStarted';
import type { Action } from '../types';

const initialState = {
  readyStatus: GET_STARTED_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_STARTED_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_STARTED_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_STARTED_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_STARTED_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_STARTED_FAILURE:
      return _.assign(state, {
        readyStatus: GET_STARTED_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
