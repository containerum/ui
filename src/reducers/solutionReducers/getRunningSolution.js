/* @flow */

import _ from 'lodash/fp';

import {
  GET_RUNNING_SOLUTION_INVALID,
  GET_RUNNING_SOLUTION_REQUESTING,
  GET_RUNNING_SOLUTION_SUCCESS,
  GET_RUNNING_SOLUTION_FAILURE
} from '../../constants/solutionConstants/getRunningSolution';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_RUNNING_SOLUTION_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_RUNNING_SOLUTION_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_RUNNING_SOLUTION_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_RUNNING_SOLUTION_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_RUNNING_SOLUTION_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_RUNNING_SOLUTION_FAILURE:
      return _.assign(state, {
        readyStatus: GET_RUNNING_SOLUTION_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
