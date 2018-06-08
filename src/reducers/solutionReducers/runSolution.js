/* @flow */

import _ from 'lodash/fp';

import {
  RUN_SOLUTION_INVALID,
  RUN_SOLUTION_REQUESTING,
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';
import type { Action } from '../../types';

const initialState = {
  readyStatus: RUN_SOLUTION_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case RUN_SOLUTION_REQUESTING:
      return _.assign(state, {
        readyStatus: RUN_SOLUTION_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case RUN_SOLUTION_SUCCESS:
      return _.assign(state, {
        readyStatus: RUN_SOLUTION_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case RUN_SOLUTION_FAILURE:
      return _.assign(state, {
        readyStatus: RUN_SOLUTION_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
