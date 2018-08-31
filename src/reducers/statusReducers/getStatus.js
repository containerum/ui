/* @flow */

import _ from 'lodash/fp';

import {
  GET_STATUS_INVALID,
  GET_STATUS_REQUESTING,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAILURE
} from '../../constants/statusConstants/getStatus';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_STATUS_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_STATUS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_STATUS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_STATUS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_STATUS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_STATUS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_STATUS_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
