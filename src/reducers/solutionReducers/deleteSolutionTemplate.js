/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_SOLUTION_INVALID,
  DELETE_SOLUTION_REQUESTING,
  DELETE_SOLUTION_SUCCESS,
  DELETE_SOLUTION_FAILURE
} from '../../constants/solutionConstants/deleteSolutionTemplate';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_SOLUTION_INVALID,
  isFetching: false,
  data: null,
  status: null,
  template: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_SOLUTION_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_SOLUTION_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        template: null,
        err: null
      });
    case DELETE_SOLUTION_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_SOLUTION_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        template: action.template,
        err: null
      });
    case DELETE_SOLUTION_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_SOLUTION_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        template: action.template,
        err: action.err
      });
    case DELETE_SOLUTION_INVALID:
      return _.assign(state, {
        readyStatus: DELETE_SOLUTION_INVALID,
        isFetching: false,
        data: null,
        status: null,
        template: null,
        err: null
      });
    default:
      return state;
  }
};
