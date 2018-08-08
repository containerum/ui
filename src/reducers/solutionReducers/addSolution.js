/* @flow */

import _ from 'lodash/fp';

import {
  ADD_SOLUTION_INVALID,
  ADD_SOLUTION_REQUESTING,
  ADD_SOLUTION_SUCCESS,
  ADD_SOLUTION_FAILURE
} from '../../constants/solutionConstants/addSolution';
import type { Action } from '../../types';

const initialState = {
  readyStatus: ADD_SOLUTION_INVALID,
  isFetching: false,
  data: null,
  status: null,
  label: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_SOLUTION_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_SOLUTION_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        label: null,
        err: null
      });
    case ADD_SOLUTION_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_SOLUTION_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        label: action.label,
        err: null
      });
    case ADD_SOLUTION_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_SOLUTION_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        label: action.label,
        err: action.err
      });
    case ADD_SOLUTION_INVALID:
      return _.assign(state, {
        readyStatus: ADD_SOLUTION_INVALID,
        isFetching: false,
        data: null,
        status: null,
        label: null,
        err: null
      });
    default:
      return state;
  }
};
