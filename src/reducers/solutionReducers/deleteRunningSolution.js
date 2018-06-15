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
  err: null,
  status: null,
  method: null,
  idSol: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_RUNNING_SOLUTION_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_RUNNING_SOLUTION_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null,
        status: null,
        method: null,
        idSol: null
      });
    case DELETE_RUNNING_SOLUTION_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_RUNNING_SOLUTION_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null,
        status: action.status,
        method: action.method,
        idSol: action.idSol
      });
    case DELETE_RUNNING_SOLUTION_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_RUNNING_SOLUTION_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err,
        status: null,
        method: null,
        idSol: null
      });
    default:
      return state;
  }
};
