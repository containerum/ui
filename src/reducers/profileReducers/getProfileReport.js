/* @flow */

import _ from 'lodash/fp';

import {
  GET_PROFILE_REPORT_INVALID,
  GET_PROFILE_REPORT_REQUESTING,
  GET_PROFILE_REPORT_SUCCESS,
  GET_PROFILE_REPORT_FAILURE
} from '../../constants/profileConstants/getProfileReport';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_PROFILE_REPORT_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PROFILE_REPORT_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_PROFILE_REPORT_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_PROFILE_REPORT_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_PROFILE_REPORT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_PROFILE_REPORT_FAILURE:
      return _.assign(state, {
        readyStatus: GET_PROFILE_REPORT_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
