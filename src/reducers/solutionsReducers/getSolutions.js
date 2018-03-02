/* @flow */

import _ from 'lodash/fp';

import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_SUCCESS,
  GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_SOLUTIONS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_SOLUTIONS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_SOLUTIONS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_SOLUTIONS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_SOLUTIONS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_SOLUTIONS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_SOLUTIONS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
