/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_RUNNING_SOLUTION_INVALID,
  DELETE_RUNNING_SOLUTION_REQUESTING,
  DELETE_RUNNING_SOLUTION_SUCCESS,
  DELETE_RUNNING_SOLUTION_FAILURE
} from '../../constants/solutionConstants/deleteRunningSolution';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_RUNNING_SOLUTION_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_RUNNING_SOLUTION_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_RUNNING_SOLUTION_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case DELETE_RUNNING_SOLUTION_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_RUNNING_SOLUTION_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case DELETE_RUNNING_SOLUTION_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_RUNNING_SOLUTION_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
